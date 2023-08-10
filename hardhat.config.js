require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config()

module.exports = {
  solidity: "0.8.4",
  networks: {
    mumbai: {
      url: process.env.RPC_URL,
      accounts: [process.env.admin_pass]
    },
  //   polygon: {
  //     url: process.env.BLOCKCHAINSERV,
  //     accounts: [process.env.PRIVATE_KEY]
  // },
  },
  etherscan: {
    apiKey: process.env.apiKey,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
};