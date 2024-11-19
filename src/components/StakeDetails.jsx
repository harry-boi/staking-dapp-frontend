const StakeDetails = ({ amountStaked, stakingDuration, stakingStartTime, apr, stakeRewards }) => {
  return (
    <div className="bg-gray-300 shadow-md rounded-lg p-6 w-full max-w-sm mx-auto">
      <div>
        <p className="text-gray-500 font-semibold">Amount Staked:</p>
        <p className="text-gray-900 font-bold">{amountStaked}</p>
      </div>
      <div>
        <p className="text-gray-500 font-semibold">Duration:</p>
        <p className="text-gray-900 font-bold">{stakingDuration}</p>
      </div>
      <div>
        <p className="text-gray-500 font-semibold">Start Time:</p>
        <p className="text-gray-900 font-bold">{stakingStartTime}</p>
      </div>
      <div>
        <p className="text-gray-500 font-semibold">APR:</p>
        <p className="text-gray-900 font-bold">{apr}</p>
      </div>
      <div>
        <p className="text-gray-500 font-semibold">Rewards:</p>
        <p className="text-gray-900 font-bold">{stakeRewards}</p>
        <button className="bg-red-500 rounded-md">Claim rewards</button>
      </div>
    </div>
  );
};

export default StakeDetails;