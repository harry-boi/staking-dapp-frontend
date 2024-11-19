import { ethers } from "ethers";
import { contractAddress,tokenContractAddress, contractAbi,tokenContractAbi } from "./contractRefs";

export let signer = null;
export let provider;

export async function getTotalTokensStaked() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress,contractAbi,provider);
    const tokensStaked = await contract.getTotalTokensStaked();
    console.log("Total Staked:",tokensStaked);
    return {
        tokensStaked: tokensStaked.toString(),
    }
}

export async function getAdmin() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress,contractAbi,provider);
    const admin = await contract.getAdmin();
    console.log("Admin:",admin);
    return admin.toString();
}

// Approve tokens for a spender contract
export async function approveTokens(tokenContractAddress, spenderAddress, amountToStake) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum); // Connect to MetaMask
      const signer = await provider.getSigner(); // Get the signer (user's wallet)
      
      // Token contract instance
      const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractAbi, signer);

      // Check current allowance
      const ownerAddress = await signer.getAddress();
      const currentAllowance = await tokenContract.allowance(ownerAddress, spenderAddress);
      const formattedAllowance = ethers.formatUnits(currentAllowance, 18);

      // Compare allowance with required amount
      if (parseFloat(formattedAllowance) >= parseFloat(amountToStake)) {
        console.log("Sufficient allowance, no need to approve");
        return true;
      }
  
      // Parse the amount to token decimals (assuming 18 decimals)
      const amountToApprove = ethers.parseUnits(amountToStake.toString(), 18);
  
      // Call approve
      const approveTx = await tokenContract.approve(spenderAddress, amountToApprove);
      console.log("Transaction submitted:", approveTx);
  
      // Wait for the transaction to be mined
      await approveTx.wait();
      console.log("Approval successful:", approveTx);
  
      return true;
    } catch (error) {
      console.error("Approval failed:", error);
      throw error;
    }
}

export async function stake(amountToStake,duration) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress,contractAbi,signer);
    await approveTokens(tokenContractAddress, contractAddress, amountToStake);
    const stakeAmount = ethers.parseUnits(amountToStake.toString(), 18); // Assuming 18 decimals
    const stakingDuration = BigInt(duration); // Convert to BigInt
    const stake = await contract.stake(stakeAmount,stakingDuration);
    console.log("Stake:",stake);
    return `${amountToStake} tokens staked for ${duration/604800} weeks`;
}

export async function claimReward(stakeIndex) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress,contractAbi,signer);
    //might need to convert duration to seconds equivalent
    const reward = await contract.claimReward(stakeIndex);
    console.log("Reward:",reward);
    return `Tokens and rewards claimed`;
}

export async function calculateReward(amountToStake,duration) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress,contractAbi,signer);
    const stakeAmount = ethers.parseUnits(amountToStake.toString(), 18); // Assuming 18 decimals
    const stakingDuration = BigInt(duration); // Convert to BigInt
    const reward = await contract.calculateReward(amountToStake,duration);
    console.log("Reward:",reward);
    return reward.toString();
}

export async function getStakeStatus() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress,contractAbi,provider);
    const stakeStatus = await contract.isStakingPaused();
    console.log("Stake status:",stakeStatus);
    return stakeStatus;
}

export async function getAllStakes(user) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress,contractAbi,provider);
    const userStakes = await contract.getAllStakes(user);
    console.log("user stakes:",userStakes);
    return userStakes;
}

export async function checkTimeLeftToClaim(user,stakeIndex) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress,contractAbi,provider);
    const timeLeft = await contract.checkTimeLeftToUnlock(user,stakeIndex);
    const daysLeft = convertDays(timeLeft).toString();
    console.log("Days left:",daysLeft);
    return daysLeft;
}

export async function getUserStakeAprPercentage(user,stakeIndex) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress,contractAbi,provider);
    const userStakeApr = await contract.getUserStakeAprPercentage(user,stakeIndex);
    console.log("Stake apr:",userStakeApr);
    return userStakeApr.toString();
}

export async function getRewardBalance(user,stakeIndex) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress,contractAbi,provider);
    const rewardBalance = await contract.getRewardBalance(user,stakeIndex);
    console.log("Reward balance:",rewardBalance);
    return rewardBalance.toString();
}

export async function getStakeStartTime(user,stakeIndex) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress,contractAbi,provider);
    const stakeStartTime = await contract.getStakeStartTime(user,stakeIndex);
    return convertSecondsToJsDate(stakeStartTime);
}

export async function getStakeDuration(user,stakeIndex) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress,contractAbi,provider);
    const stakeDuration = await contract.getStakeDuration(user,stakeIndex);
    return stakeDuration.toString();
}

export async function getStakedBalance(user,stakeIndex) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress,contractAbi,provider);
    const stakeAmount = await contract.getStakedBalance(user,stakeIndex);
    return stakeAmount.toString();
}

export async function estimatedUnlockingDate() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress,contractAbi,provider);
    const stakeStartTime = await contract.getStakeStartTime(user,stakeIndex);
    const stakeDuration = await contract.getStakeDuration(user,stakeIndex);
    const unlockingDate = stakeStartTime + stakeDuration;
    return convertSecondsToJsDate(unlockingDate);
}

export async function updateAPR(duration,newApr) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress,contractAbi,signer);
    const aprUpdate = await contract.updateAPR(duration,newApr);
    console.log("apr:",aprUpdate);
    return `Apr updated`;
}

export async function pauseStaking() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress,contractAbi,signer);
    const pauseStaking = await contract.pauseStaking();
    console.log("Stake pause:",pauseStaking);
    return `Staking Paused`;
}

export async function resumeStaking() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress,contractAbi,signer);
    const resumeStaking = await contract.resumeStaking();
    console.log("Stake resume:",resumeStaking);
    return `Staking Resumed`;
}

export function convertSecondsToJsDate(durationInSeconds) {
    // Convert to milliseconds and create a Date object
    const durationDate = new Date(durationInSeconds.toString() * 1000);
    
    console.log("Duration date:", durationDate.toLocaleString()); // logs the date in a human-readable format
    
    return durationDate;
}

export function convertDays(durationInSeconds) {
    const days = Math.floor(durationInSeconds.toString() / 86400); // 1 day = 86400 seconds
    return `${days} days left`;
}

export function convertSeconds(durationInSeconds) {
    const days = Math.floor(durationInSeconds / 86400); // 1 day = 86400 seconds
    const hours = Math.floor((durationInSeconds % 86400) / 3600); // Remaining hours after days
    const minutes = Math.floor((durationInSeconds % 3600) / 60); // Remaining minutes after hours
    const seconds = durationInSeconds % 60; // Remaining seconds

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}








