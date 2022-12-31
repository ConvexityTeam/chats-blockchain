const chats = artifacts.require('ChatsToken.sol');
const operations = artifacts.require('Operations.sol');

module.exports =  (deployer) => {
  deployer.deploy(operations).then(async (deployed) => {
  const chatsAddress = await deployer.deploy(chats, 'CHATS', 'CHS', deployed.address);
  console.log('CHATS Token Contract is deployed', chatsAddress.address);
  });
};
