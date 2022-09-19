import { useConnectModal } from '@rainbow-me/rainbowkit';
import style from '../styles/ConnectWallet.module.css';

export const ConnectWallet = () => {
  const { openConnectModal } = useConnectModal();
  return (
    <>
      <p>Connecting your wallet is like "logging in" to Web3.</p>
      <p>Select your wallet from the options to get started.</p>
      <div className={style.connectBox}>
        <button onClick={openConnectModal} className={style.connect}>
          Connect wallet
        </button>
      </div>
    </>
  );
};
