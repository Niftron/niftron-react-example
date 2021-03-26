import { NIFTRON, NiftronAssetResponse } from "niftron-sdk";
import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

export default function Home() {
  const [issuer, setIssuer] = useState<string>();
  const [assetCode, setAssetCode] = useState<string>();
  const [niftrons, setNiftrons] = useState<number>();

  const testSDK = async () => {
    try {
      const res: any = await NIFTRON.user.testTransfer();
      console.log(res);
    } catch (e) {
      console.log("error", e);
    }
  };

  const getBalance = async () => {
    try {
      const res: NiftronAssetResponse | null = await NIFTRON.user.getNiftronCreditBalance();
      console.log(res);
      if (res) {
        setIssuer(res.issuer);
        setAssetCode(res.assetCode);
        setNiftrons(res.balance);
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  return (
    <Container maxWidth="md">
      <Box my={10}>
        {/* <div>
          <div>Welcome to Share A Badge</div>
          {assetCode && niftrons && (
            <>
              <div>Issuer: {issuer}</div>
              <div>
                {assetCode}: {niftrons}
              </div>
            </>
          )}
          <button onClick={testSDK}>testSDK</button>
          <button onClick={getBalance}>Get Account Balance</button>
        </div> */}
      </Box>{" "}
    </Container>
  );
}
