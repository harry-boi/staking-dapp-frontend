const StakeDetails = ({ amountStaked, stakingDuration, stakingStartTime, apr, stakeRewards,daysLeft }) => {
  return (
    <div className="bg-gray-300 shadow-md rounded-lg w-full max-w-sm mx-auto flex flex-col items-start p-6">
        <p className="text-gray-500 font-semibold">Amount Staked: {amountStaked} CT</p>
        <p className="text-gray-500 font-semibold">Duration: {stakingDuration} ({daysLeft})</p>
        <p className="text-gray-500 font-semibold">Start Time: {stakingStartTime}</p>
        <p className="text-gray-500 font-semibold">APR: {apr}</p>
        <p className="text-gray-500 font-semibold">Rewards: {stakeRewards} CT</p>
        <button className="bg-indigo-500 rounded-lg self-end p-2 cursor-pointer font-semibold">Claim rewards</button>
    </div>
  );
};

export default StakeDetails;