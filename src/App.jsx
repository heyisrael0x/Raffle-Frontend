import "./App.css";
import ManualHeader from "./components/ManualHeader";
import Header from "./components/Header";
import LotteryEntrance from "./components/LotteryEntrance";
// import {dotenv} from "dotenv"
// dotenv.config();

// Wallet Connect
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { hardhat, sepolia, goerli } from "wagmi/chains";

const chains = [hardhat, sepolia, goerli];
const projectId = "1149ae46317fe7bd538d3d996c37b30d";
// console.log(process.env.CONNECTWALLET_PROJECTID);

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 2, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);
function App() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <ManualHeader />
        <Header/>
        <LotteryEntrance />
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
