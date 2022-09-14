import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HtmlHead from '../components/HtmlHead';
import '../styles/globals.css';

function Hubster({ Component, pageProps }: AppProps) {
  return (
    <>
      <HtmlHead />
      <NextNProgress
        height={4}
        options={{ trickle: false, showSpinner: false }}
      />
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

export default Hubster;
