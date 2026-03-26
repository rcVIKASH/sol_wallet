import { useEffect, useState } from "react";
import {
  ConnectionProvider,
  useConnection,
  useWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

export default function App() {
  const endpoint = "https://api.devnet.solana.com";

  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <ConnectButton />
            <UserPortfolio />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

function ConnectButton() {
  const { publicKey } = useWallet();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      {!publicKey ? <WalletMultiButton /> : <WalletDisconnectButton />}
    </div>
  );
}

function UserPortfolio() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const getBalance = async () => {
      if (publicKey && connection) {
        const balance = await connection.getBalance(publicKey);
        setBalance(balance);
      }
    };
    getBalance();
  }, [publicKey, connection]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: "50px",
          border: "1px solid pink",
          borderRadius: "30px",
          padding: "10px",
          width: "300px",
        }}
      >
        {/* render on 5 from start and end with 8 dot in between */}
        <span>{publicKey?.toString().slice(0, 5)}</span>
        <span>......</span>
        <span>{publicKey?.toString().slice(-5)}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: "50px",
          border: "1px solid pink",
          borderRadius: "30px",
          padding: "10px",
          width: "300px",
        }}
      >
        <span>Balance: {balance / 1e9} SOL</span>
      </div>
    </>
  );
}
