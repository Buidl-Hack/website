import Head from 'next/head';

export default function HtmlHead() {
  return (
    <Head>
      <title>Hubster</title>
      <meta name="description" content="web3 job hub" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
