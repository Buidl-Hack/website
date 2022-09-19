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

const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygonMumbai],
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
        <RainbowKitProvider chains={chains}>
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
