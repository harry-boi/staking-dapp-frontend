import React, { useState } from "react";
import ConnectWallet from "./ConnectButton";
const NavBar = ({ wallet, setWallet }) => {
  return (
    <nav className="bg-gray-900 text-white p-4 container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-500">CodeToken</div>
        <div className="w-full flex justify-end">
          <ul>
            <ConnectWallet wallet={wallet} setWallet={setWallet} />
          </ul>
        </div>
    </nav>
  );
};

export default NavBar;
