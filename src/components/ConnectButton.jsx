import React from "react";
import { ethers } from "ethers";

const ConnectButton = ({ wallet, setWallet }) => {
  const handleWalletConnection = async () => {
    let signer = null;
    let provider;

    if (window.ethereum == null) {
      console.log("MetaMask wallet not installed");
      return;
    }

    try {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      console.log(await signer.getAddress());
      setWallet(await signer.getAddress());
    } catch (error) {
      console.log("An error occurred", error);
    }
  };
  return (
    <button
      className="px-4 py-2 bg-indigo-600 max-w-md hover:bg-indigo-700 rounded-lg font-medium transition-colors duration-300"
      onClick={handleWalletConnection}
    >
      {wallet ? (
        `${wallet.slice(0, 6)}....${wallet.slice(-4)}`
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>
  );
};

export default ConnectButton;
