/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import { useEffect, useState } from "react";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useCandyMachine from "../hooks/useCandyMachine";
import useWalletBalance from "../hooks/useWalletBalance";
import { useWallet } from "@solana/wallet-adapter-react";

import { Toaster } from "react-hot-toast";
import Countdown from "react-countdown";
import useWalletNfts from "../hooks/useWalletNFTs";
import AnNFT from "../components/AnNFT/AnNFT";

export default function Home() {
  const [balance] = useWalletBalance();
  const {
    isSoldOut,
    mintStartDate,
    isMinting,
    startMint,
    startMintMultiple,
    nftsData,
  } = useCandyMachine();

  const [isLoading, nfts] = useWalletNfts();

  const { connected } = useWallet();

  const [isMintLive, setIsMintLive] = useState(false);

  useEffect(() => {
    if (new Date(mintStartDate).getTime() < Date.now()) {
      setIsMintLive(true);
    }
  }, []);

  const MintMany = () => {
    const [mintCount, setMintCount] = useState(5);

    return (
      <>
        <button
          onClick={() => startMintMultiple(mintCount)}
          disabled={isMinting}
          className="px-4 py-2 mx-auto font-bold text-white transition-opacity rounded-lg hover:opacity-70 bg-gradient-to-br from-green-300 via-blue-500 to-purple-600"
        >
          {isMinting ? "loading" : `mint ${mintCount}`}
        </button>

        <input
          disabled={isMinting}
          type="number"
          min={2}
          max={10}
          className="px-2 mx-auto mt-5 font-bold text-white bg-gray-500"
          value={mintCount}
          onChange={(e) => setMintCount((e.target as any).value)}
        />
        <p className="mx-auto mt-2">min 2; max 10;</p>
      </>
    );
  };

  return (
    <div style={{display: "flex", flexDirection: "column",justifyContent: "center", alignItems: "center", minHeight: "100vh"}}>
    <h1 style={{fontSize: "48px", fontWeight: "bolder", marginBottom: "35px"}}>View Your NFTs</h1>
    <div style={{width: "100%", maxWidth: "600px", backgroundColor: "#fafafa", padding: "50px", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Toaster />

        {/* Balance */}
        {connected && (
            <p style={{marginBottom: "15px", fontSize: "20px", fontWeight: "bold"}}>balance: <span style={{fontWeight: "normal"}}>{balance.toFixed(2)} SOL</span></p>
        )}

        <WalletMultiButton />

        <h2 style={{marginTop: "35px"}} className="text-2xl font-bold">{isLoading ? 'Loading NFTs from wallet...' : 'Your NFTs'}</h2>


        <div style={{marginTop: "35px", display: "flex", flexWrap: "wrap"}}>
            {(nfts as any).map((nft: any, i: number) => {
              return <AnNFT key={i} nft={nft} />;
            })}
        </div>
      
      </div>
      </div>
  );
}
