import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HtmlHead from '../components/HtmlHead';
import '../styles/globals.css';

/* const ganache: Chain = {
  id: 5777,
  name: 'Ganache',
  network: 'ganache',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: 'https://127.0.0.1:7545',
  },
  testnet: false,
}; */

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.polygonMumbai,
    // ganache,
  ],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
  webSocketProvider,
});

function Hubster({ Component, pageProps }: AppProps) {
  return (
    <>
      <HtmlHead />
      <NextNProgress
        height={4}
        options={{ trickle: false, showSpinner: false }}
      />
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} modalSize="compact">
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
        </RainbowKitProvider>
      </WagmiConfig>
      <Footer />
    </>
  );
}

export default Hubster;
