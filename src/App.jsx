import React, { useState,useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import NavBar from "./components/NavBar";
import Card from "./components/Card";
import { FaUnlock } from "react-icons/fa";
import Modal from "./components/Modal";
import StakeDetails from "./components/StakeDetails";
import {getTotalTokensStaked,getAdmin,calculateReward,stake,getStakedBalance,getAllStakes} from "./utils/utils";



const App = () => {
  const [amount, setAmount] = useState();
  const [stakingPeriod, setStakingPeriod] = useState("30");
  const [estimatedRewards, setEstimatedRewards] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [totalTokensStaked,setTotalTokensStaked] = useState(0);
  const [userStakes,setUserStakes] = useState([]);
  const [adminAddress, setAdminAddress] = useState(null);
  const weekInSeconds = 604800;
  const [rewardsEarned, setRewardsEarned] = useState(null);


  useEffect(() => {
    async function fetchTotalTokensStaked() {
      const { tokensStaked } = await getTotalTokensStaked();
      setTotalTokensStaked(tokensStaked);
    }
    async function fetchAdmin() {
      const admin = await getAdmin();
      setAdminAddress(admin);
    }
    fetchAdmin();
    fetchTotalTokensStaked();
  },[]);

  useEffect(() => {
    async function fetchStakes() {
      const userStakes = await getAllStakes(wallet);

      setUserStakes(userStakes);
      console.log(userStakes)
      console.log(userStakes[0][0])
    }
    fetchStakes();
  },[wallet]);

  const handleAmountChange = (e) => {
    const amt = e.target.value;
    setAmount(amt);
  };

  const handlePeriodChange = (e) => {
    const period = e.target.value;
    setStakingPeriod(period);
  };

  useEffect(() => {
    async function handleEstimatedRewards() {
      // Validate inputs
      if (!amount || !stakingPeriod) {
        console.warn("Amount or stakingPeriod is not defined. Skipping calculation.");
        return;
      }
  
      try {
        const estimatedRewards = await calculateReward(amount, stakingPeriod * weekInSeconds);
        setEstimatedRewards(estimatedRewards);
        console.log("Estimated Rewards:", estimatedRewards);
      } catch (error) {
        console.error("Error in handleEstimatedRewards:", error);
      }
    }
  
    handleEstimatedRewards();
  }, [amount, stakingPeriod]);
  


  const handleStake = async () => {
    // Check if amount is valid
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
  
    // Check if stakingPeriod is valid
    if (!stakingPeriod || isNaN(stakingPeriod) || parseInt(stakingPeriod) <= 0) {
      alert("Please select a valid staking period");
      return;
    }
  
    // Ensure weekInSeconds is defined
    if (!weekInSeconds || isNaN(weekInSeconds)) {
      console.error("Invalid weekInSeconds value");
      return;
    }
  
    try {
      // Calculate staking duration
      const stakingDuration = stakingPeriod * weekInSeconds;
      console.log(amount)
      console.log(stakingDuration)
  
      // Call the stake function
      const status = await stake(amount, stakingDuration);
  
      alert(status);
      setShowSummary(true);
    } catch (error) {
      console.error("Stake failed:", error);
      alert("An error occurred during staking");
    }
  };
  

  const closeModal = () => {
    setShowSummary(false);
  };

  return wallet == adminAddress ? (
    <div className="bg-gray-900 min-h-screen">
      <NavBar wallet={wallet} setWallet={setWallet} />
      <div className="text-white">ADMIN ROLE</div>
    </div>
  ) : (
    <div className="bg-gray-900 min-h-screen">
      <NavBar wallet={wallet} setWallet={setWallet} />
      <div className="w-full sm:w-[100%]]">
          <Card title="Total Tokens Staked" value={ethers.formatUnits(totalTokensStaked, 18)} svg={<FaUnlock />} />
      </div>
      <div className="w-full sm:w-[100%]]">
      {userStakes.length > 0 ? (
        userStakes.map((stake, index) => (
          <StakeDetails
          key={index} // Unique key for each element
          amountStaked={ethers.formatUnits(stake[0], 18)} // Convert `amountStaked` to a readable value
          stakingDuration={`${stake[1].toString() / 604800} weeks`} // Assuming `604800` is the seconds in a week
          stakingStartTime={new Date(stake[2].toString() * 1000).toLocaleString()} // Convert UNIX timestamp to readable format
          apr={`${stake[3]}%`} // Convert APR to a percentage
          stakeRewards={ethers.formatUnits(stake[4], 18)} // Format rewards to token decimals
          />
        ))
      ) : (
        <div>No stakes available</div>
      )}
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
              <option value="" disabled>Please Select Duration</option>
              <option value="1">1 week - 3% APR</option>
              <option value="4">4 weeks - 12% APR</option>
            </select>
          </div>

          {/* Estimated Rewards Display */}
          <div className="mt-6">
            <p className="text-lg font-semibold text-gray-300">
              Estimated Rewards:{" "}
              <span className="text-indigo-400">
                {estimatedRewards > 0 ? estimatedRewards : "0.00"}{" "}
                Tokens
              </span>
            </p>
          </div>

          <button
            onClick={handleStake}
            className="w-full mt-8 py-3 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition duration-300"
            disabled={!amount && !stakingPeriod}
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
