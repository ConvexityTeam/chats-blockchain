const { Config } = require("../utils");
const fs = require("fs");
const {ethers} = require("ethers");
const provider = new ethers.providers.getDefaultProvider(Config.BLOCKCHAINSERV);

const account = Config.ADMIN;
const account_pass = Config.ADMIN_PASS;

const tokenAddress = Config.CONTRACTADDR;
const operationsAddress = Config.OPERATIONSADDR;

// nft smart contract address
const nftAddress = Config.NFTADDR;

const tokenContract = (_wallet)=> { 
  walletInit = new ethers.Wallet(_wallet, provider);
  const initContract = new ethers.Contract(Config.CONTRACTADDR, JSON.parse(fs.readFileSync("contracts/artifacts/Chats.json", {encoding: "utf8"}))['abi'], walletInit)
  return initContract;
}

const nftContract = (_wallet) => {
  walletInit = new ethers.Wallet(_wallet, provider);
  const initContract = new ethers.Contract(Config.DEPLOYEDNFTCONTRACT, JSON.parse(fs.readFileSync("contracts/artifacts/nft.json", {encoding: "utf8"}))['abi'], walletInit)
  //console.log(initContract)
  return initContract;
}
const getNFTContract = new ethers.Contract(Config.DEPLOYEDNFTCONTRACT, JSON.parse(fs.readFileSync("contracts/artifacts/nft.json", {encoding: "utf8"}))['abi'], provider)

const getTokenContract = new ethers.Contract(Config.CONTRACTADDR, JSON.parse(fs.readFileSync("contracts/artifacts/Chats.json", {encoding: "utf8"}))['abi'], provider)

const factoryContract = (_wallet, collectionAddress) => {
  walletInit = new ethers.Wallet(_wallet, provider);
  const initContract = new ethers.Contract(collectionAddress, JSON.parse(fs.readFileSync("contracts/artifacts/factory.json", {encoding: "utf8"}))['abi'], walletInit)
  //console.log(initContract)
  return initContract;
}

const operationsContract = (_wallet)=> { 
  walletInit = new ethers.Wallet(_wallet, provider);
  const initContract = new ethers.Contract(Config.OPERATIONSADDR, JSON.parse(fs.readFileSync("contracts/artifacts/Operations.json", {encoding: "utf8"}))['abi'], walletInit)
  return initContract;
}

const getOpsContract = new ethers.Contract(Config.OPERATIONSADDR, JSON.parse(fs.readFileSync("contracts/artifacts/Operations.json", {encoding: "utf8"}))['abi'], provider)

const escrowContract = (_wallet, contractAddress)=> { 
  walletInit = new ethers.Wallet(_wallet, provider);
  const initContract = new ethers.Contract(contractAddress, JSON.parse(fs.readFileSync("contracts/artifacts/escrow.json", {encoding: "utf8"}))['abi'], walletInit)
  return initContract;
}

const escrowFactoryContract = (_wallet)=> { 
  walletInit = new ethers.Wallet(_wallet, provider);
  const initContract = new ethers.Contract(Config.ESCROWFACTORYCONTRACT, JSON.parse(fs.readFileSync("contracts/artifacts/escrowFactory.json", {encoding: "utf8"}))['abi'], walletInit)
  return initContract;
}

const getEscrowContract = (escrowContractAddress) => {
  return new ethers.Contract(escrowContractAddress, JSON.parse(fs.readFileSync("contracts/artifacts/escrow.json", {encoding: "utf8"}))['abi'], provider)
}

const getEscrowFactoryContract = new ethers.Contract(Config.ESCROWFACTORYCONTRACT, JSON.parse(fs.readFileSync("contracts/artifacts/escrowFactory.json", {encoding: "utf8"}))['abi'], provider)
module.exports = {
  provider,
  tokenAddress,
  operationsAddress,
  tokenContract,
  operationsContract,
  getTokenContract,
  getOpsContract,
  account,
  account_pass,
  nftContract,
  getNFTContract,
  factoryContract,
  escrowContract,
  escrowFactoryContract,
  getEscrowContract,
  getEscrowFactoryContract
};
