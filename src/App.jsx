import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [amount, setAmount] = useState("");
  const [stakingPeriod, setStakingPeriod] = useState("30");
  const [estimatedRewards, setEstimatedRewards] = useState(0);

  // Update estimated rewards based on amount and period
  const calculateRewards = (amt, period) => {
    const rate = period === "30" ? 0.05 : period === "60" ? 0.1 : 0.15;
    return amt * rate;
  };

  const handleAmountChange = (e) => {
    const amt = e.target.value;
    setAmount(amt);
    setEstimatedRewards(calculateRewards(amt, stakingPeriod));
  };

  const handlePeriodChange = (e) => {
    const period = e.target.value;
    setStakingPeriod(period);
    setEstimatedRewards(calculateRewards(amount, period));
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg text-white">
        <h1 className="text-2xl font-bold mb-6 text-center text-indigo-500">
          Staking DApp
        </h1>

        {/* Staking Amount Input */}
        <label htmlFor="amount" className="text-sm font-semibold text-gray-300">
          Staking Amount
        </label>
        <input
          type="number"
          id="amount"
          className="w-full mt-1 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-indigo-500 focus:outline-none mb-5"
          placeholder="Enter amount"
          value={amount}
          onChange={handleAmountChange}
        />

        {/* Staking Period Selection */}
        <label
          htmlFor="stakingPeriod"
          className="text-sm font-semibold text-gray-300"
        >
          Select Staking Period
        </label>
        <select
          id="stakingPeriod"
          className="w-full mt-1 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-indigo-500 focus:outline-none mb-5"
          value={stakingPeriod}
          onChange={handlePeriodChange}
        >
          <option value="30">30 Days - 5% APY</option>
          <option value="60">60 Days - 10% APY</option>
          <option value="90">90 Days - 15% APY</option>
        </select>

        {/* Estimated Rewards Display */}
        <div className="mt-6">
          <p className="text-lg font-semibold text-gray-300">
            Estimated Rewards:{" "}
            <span className="text-indigo-400">
              {estimatedRewards > 0 ? estimatedRewards.toFixed(2) : "0.00"}{" "}
              Tokens
            </span>
          </p>
        </div>

        {/* Stake Button */}
        <button
          className="w-full mt-8 py-3 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition duration-300"
          disabled={!amount}
        >
          Stake Now
        </button>
      </div>
    </div>
  );
};

export default App;
