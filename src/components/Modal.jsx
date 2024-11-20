import React, { useState, useEffect } from "react";
import { FaUnlock } from "react-icons/fa";

// Modal component
const Modal = ({
  isOpen,
  onClose,
  amount,
  stakingPeriod,
  estimatedRewards,
  handleStake,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="bg-gray-800 rounded-lg shadow-lg p-8 w-11/12 max-w-md text-white transform transition-transform duration-300 scale-105"
        style={{
          animation: "scaleIn 0.3s ease-out",
        }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-indigo-400">
          Staking Summary
        </h2>

        <div className="space-y-3 text-center">
          <p>
            <strong>Amount Staked:</strong> {amount} Tokens
          </p>
          <p>
            <strong>Staking Period:</strong> {stakingPeriod} Weeks
          </p>
          <p>
            <strong>Estimated Rewards:</strong> {estimatedRewards} Tokens
          </p>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-lg bg-red-500 text-white font-semibold transition-transform duration-300 hover:scale-105"
          >
            Cancel
          </button>
          <button
            onClick={handleStake}
            className="w-full py-2 rounded-lg bg-indigo-500 text-white font-semibold transition-transform duration-300 hover:scale-105"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
