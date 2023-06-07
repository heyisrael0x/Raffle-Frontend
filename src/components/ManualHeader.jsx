import { useEffect } from "react";
import { useMoralis } from "react-moralis";
function ManualHeader() {
  const { enableWeb3, isWeb3Enabled, account, Moralis, deactivateWeb3, isWeb3EnableLoading } =
    useMoralis();

  const disconnect = ()=>{
    window.localStorage.removeItem("connected");
    deactivateWeb3();
  }

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log("Account changed to", account);
      if (account == null) {
        disconnect()
      }
    });
  }, []);
  useEffect(() => {
    console.log("hi");
    console.log(isWeb3Enabled);
    if (typeof window != "undefined") {
      if (window.localStorage.getItem("connected")) {
        enableWeb3();
      }
    }
  }, [isWeb3Enabled]);
  return (
    <div className="border-b-2 p-5 flex flex-row justify-between">
    <h1 className="py-4 px-4 font-bold text-3xl">Decentralized Raffle</h1>
      {account ? (
        <button
        onClick={disconnect}
          className="px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full py-1">
          {account.slice(0, 5)}....{account.slice(account.length - 4)}
        </button>
      ) : (
        <button
          className="ml-auto px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full ml-auto"
          onClick={async () => {
            await enableWeb3();
            if (typeof window != "undefined") {
              window.localStorage.setItem("connected", "injected");
            }
          }}
          disabled={isWeb3EnableLoading}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default ManualHeader;
