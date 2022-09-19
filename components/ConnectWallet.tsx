import { ConnectButton } from '@rainbow-me/rainbowkit';

export const ConnectWallet = () => (
  <>
    <p>Connecting your wallet is like "logging in" to Web3.</p>
    <p>Select your wallet from the options to get started.</p>
    <ConnectButton showBalance={false} />
  </>
);
