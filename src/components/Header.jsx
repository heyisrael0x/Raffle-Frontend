import { Web3Button } from "@web3modal/react";
const Header = () => {
  return (
    <div className="border-b-2 p-5 flex flex-row justify-between">
      <h1 className="py-4 px-4 font-bold text-3xl">Decentralized Raffle</h1>
      <Web3Button />
    </div>
  );
};

export default Header;
