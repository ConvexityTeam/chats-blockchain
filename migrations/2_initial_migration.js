const CHATS = artifacts.require('Chats.sol');

module.exports = (deployer) => {
  deployer.deploy(CHATS, '0');
  console.log('CHATS Token Contract is deployed');
};
