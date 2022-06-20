const { Config } = require("../utils");
// const { DefenderRelayProvider } = require('defender-relay-client/lib/web3');
const fs = require("fs");
const Web3 = require("web3");
// const credentials = { apiKey: Config.RELAY_GASLESS_API, apiSecret: Config.RELAY_GASLESS_SECRET };
// const provider = new DefenderRelayProvider(credentials, { speed: 'fastest' });
const provider = new Web3.providers.HttpProvider(Config.BLOCKCHAINSERV);

const web3 = new Web3(provider);

const account = Config.ADMIN;
const account_pass = Config.ADMIN_PASS;

const address = Config.CONTRACTADDR;
const abi = JSON.parse(fs.readFileSync("build/contracts/Chats.json", {encoding: "utf8"}))['abi']
// const contract = (from) => new web3.eth.Contract(abi, address, {from});
const contract = new web3.eth.Contract(abi, address)

module.exports = {
  web3,
  address,
  contract,
  account,
  account_pass,
};
