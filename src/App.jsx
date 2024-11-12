import React, { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Card from "./components/Card";
import { FaUnlock } from "react-icons/fa";
import Modal from "./components/Modal";

const App = () => {
  const [amount, setAmount] = useState("");
  const [stakingPeriod, setStakingPeriod] = useState("30");
  const [estimatedRewards, setEstimatedRewards] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [wallet, setWallet] = useState(null);

  const calculateRewards = (amt, period) => {
    const rate = period === "30" ? 0.05 : period === "60" ? 0.1 : 0.15;
    return amt * rate;
  };

  //This is a demo function I created for the UI. replace it with the actual calls to the smart contract.
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

  const handleStakeNow = () => {
    setShowSummary(true);
  };

  const closeModal = () => {
    setShowSummary(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <NavBar wallet={wallet} setWallet={setWallet} />
      <div className="flex flex-wrap justify-center w-2/3 space-x-2 m-auto mt-10 gap-4">
        <div className="w-full sm:w-[48%]">
          <Card title="Your Stake" value="21.0M" svg={<FaUnlock />} />
        </div>
        <div className="w-full sm:w-[48%]">
          <Card title="Rewards Earned" value="0.0" svg={<FaUnlock />} />
        </div>
        <div className="w-full sm:w-[48%]">
          <Card title="APY" value="0.0" svg={<FaUnlock />} />
        </div>
        <div className="w-full sm:w-[48%]">
          <Card title="Time Left" value="0.0" svg={<FaUnlock />} />
        </div>
      </div>

      <div className="flex w-screen mt-8 items-center justify-center">
        <div className="w-3/4 p-8 bg-gray-800 rounded-lg shadow-lg text-white">
          <div className="w-full flex flex-col items-start">
            {/* Staking Amount Input */}
            <label
              htmlFor="amount"
              className="text-sm font-semibold text-gray-300"
            >
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
          </div>
          <div className="flex flex-col items-start">
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
          </div>

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

          <button
            onClick={handleStakeNow}
            className="w-full mt-8 py-3 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition duration-300"
            disabled={!amount}
          >
            Stake Now
          </button>
        </div>
      </div>

      {/* Modal for displaying Staking Summary */}
      <Modal
        isOpen={showSummary}
        onClose={closeModal}
        amount={amount}
        stakingPeriod={stakingPeriod}
        estimatedRewards={estimatedRewards}
      />
    </div>
  );
};

export default App;
