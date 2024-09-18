require("@nomicfoundation/hardhat-toolbox");

// Go to https://infura.io, sign up, create a new API key
// in its dashboard, and replace "KEY" with it
const INFURA_API_KEY = "6eb4b0df743f4331ba5faf93474a2818";

// Replace this private key with your Sepolia account private key
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const SEPOLIA_PRIVATE_KEY = "78410277a433e487aab5dbed6ee0c92a6882e7f7b09e2a753cc11b21aa238e36";

const AMOY_PRIVATE_KEY = "78410277a433e487aab5dbed6ee0c92a6882e7f7b09e2a753cc11b21aa238e36";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    // hardhat: {
    //   chainId: 1337,
    // },
    // sepolia: {
    //   url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
    //   accounts: [SEPOLIA_PRIVATE_KEY]
    // },
    amoy: {
      url: `https://polygon-amoy.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [AMOY_PRIVATE_KEY]
    },
  },
  paths: {
    artifacts: "./frontend/src/artifacts",
  },
};