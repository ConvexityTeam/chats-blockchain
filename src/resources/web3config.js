const { Config } = require("../utils");
const fs = require("fs");
const Web3 = require("web3");
const provider = new Web3.providers.HttpProvider(Config.BLOCKCHAINSERV);

const web3 = new Web3(provider);

const account = Config.ADMIN;
const account_pass = Config.ADMIN_PASS;

const tokenAddress = Config.CONTRACTADDR;
const operationsAddress = Config.OPERATIONSADDR;
const abi = JSON.parse(fs.readFileSync("build/contracts/ChatsToken.json", {encoding: "utf8"}))['abi']
const tokenContract = new web3.eth.Contract(abi, tokenAddress)
const operationsContract = new web3.eth.Contract(JSON.parse(fs.readFileSync("build/contracts/Operations.json", {encoding: "utf8"}))['abi'], Config.OPERATIONSADDR)

module.exports = {
  provider,
  web3,
  tokenAddress,
  operationsAddress,
  tokenContract,
  operationsContract,
  account,
  account_pass,
};
