const { Config } = require("../utils");
const fs = require("fs");
const {ethers} = require("ethers");
const provider = new ethers.providers.getDefaultProvider(Config.BLOCKCHAINSERV);

const account = Config.ADMIN;
const account_pass = Config.ADMIN_PASS;

const tokenAddress = Config.CONTRACTADDR;
const operationsAddress = Config.OPERATIONSADDR;

const tokenContract = (_wallet)=> { 
  walletInit = new ethers.Wallet(_wallet, provider);
  const initContract = new ethers.Contract(Config.CONTRACTADDR, JSON.parse(fs.readFileSync("build/contracts/ChatsToken.json", {encoding: "utf8"}))['abi'], walletInit)
  return initContract;
}

const operationsContract = (_wallet)=> { 
  walletInit = new ethers.Wallet(_wallet, provider);
  const initContract = new ethers.Contract(Config.OPERATIONSADDR, JSON.parse(fs.readFileSync("build/contracts/Operations.json", {encoding: "utf8"}))['abi'], walletInit)
  return initContract;
}

module.exports = {
  provider,
  tokenAddress,
  operationsAddress,
  tokenContract,
  operationsContract,
  account,
  account_pass,
};
