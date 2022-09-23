// const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync('.secret').toString().trim();

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
    },
    mumbai: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          'https://polygon-mumbai.g.alchemy.com/v2/' +
            process.env.ALCHEMY_PROJECT_KEY,
        ),
      network_id: 0x13881,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  mocha: {
    // timeout: 100000
  },
  compilers: {
    solc: {
      version: '0.8.13',
    },
  },
};
