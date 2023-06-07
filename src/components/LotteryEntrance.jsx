// have a function to enter the raffle
import { useEffect, useState } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { contractAbi, contractAddresses } from "../constants";
import { ethers } from "../constants/ethers-5.1.esm.min.js";
const LotteryEntrance = () => {
  const [entranceFee, setEntranceFee] = useState("0");
  const [numPlayers, setNumPlayers] = useState("0");
  const [recentWinner, setRecentWinner] = useState("0");

  const { chainId: chaindHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chaindHex);
  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  // console.log(contractAbi)
  const { runContractFunction: enterRaffle, isLoading, isFetching} = useWeb3Contract({
    abi: contractAbi,
    contractAddress: raffleAddress,
    functionName: "enterRaffle",
    params: {},
    msgValue: entranceFee,
  });
  console.log(isFetching)
  console.log(isLoading)

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
    params: {},
  });

  const { runContractFunction: getNumberPlayers } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: raffleAddress,
    functionName: "getNumberPlayers",
    params: {},
  });

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: raffleAddress,
    functionName: "getRecentWinner",
    params: {},
  });

  async function updateUI() {
    const entranceFeeFromContract = (await getEntranceFee()).toString();
    const numberPlayersFromContract = (await getNumberPlayers()).toString();
    const recentWinnerFromContract = (await getRecentWinner()).toString();
    setEntranceFee(entranceFeeFromContract);
    console.log(entranceFeeFromContract)
    setNumPlayers(numberPlayersFromContract);
    setRecentWinner(recentWinnerFromContract);
  }
  // updateUI();
  useEffect(() => {
    if (isWeb3Enabled) { 
      updateUI();
    }
  }, [isWeb3Enabled]);
  return (
    <div className="p-5">
      {raffleAddress ? (
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
            onClick={async function () {
              updateUI();
              await enterRaffle({
                onComplete: updateUI(),
                onSuccess: updateUI()
              });
            }}
            disabled={isLoading || isFetching}
          >
            {isLoading || isFetching?(<div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>):("Enter Raffle")}
          </button>
          {/* Entrance Fee is {entranceFee} ETH */}
          <div> Entrance Fee is {ethers.utils.formatUnits(entranceFee, "ether")} ETH </div>
          <div>Numbers of players is {numPlayers}</div>
          <div>Recent Winner is {recentWinner}</div>
        </div>
      ) : (
        <div>no raffle address detected</div>
      )} 
    </div>
  );
};

export default LotteryEntrance;
