const FreeMoney = artifacts.require('FreeMoney.sol');

module.exports = (deployer) => {
  deployer.deploy(FreeMoney, '1000000000000000000000000');
  console.log('FreeMoney Token Contract is deployed');
};
