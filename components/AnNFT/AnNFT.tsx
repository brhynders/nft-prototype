/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";

export default function AnNFT({ nft }: any) {
  useEffect(() => {
    console.log(nft);
  }, []);

  return (
    <div style={{padding: "10px", width: "50%"}}>
      <div style={{backgroundColor: "white", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", padding: "15px"}}>
        <p style={{fontSize: "20px", marginBottom: "15px"}}>{nft.name}</p>
        <img src={nft.image} alt={nft.description || nft.name} />
        <p style={{fontSize: "18px", margin: "15px 0"}}>Traits</p>
      </div>
    </div>
  );
}
