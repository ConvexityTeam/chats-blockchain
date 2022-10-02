const { Config } = require("../utils");
// const web3  = require('web3');
const { ethers } = require("ethers");
const provider = new ethers.providers.getDefaultProvider(Config.BLOCKCHAINSERV);
const Common = require("@ethereumjs/common").default;
const { Chain, Hardfork} = require("@ethereumjs/common")
const deployerAccount = Config.ADMIN;
const commons = new Common({ chain: Chain.Mainnet});

async function wallet(_pkey) {
  const wallet = new ethers.Wallet(_pkey, provider);
  return wallet;
}

async function sendEther(amount, addressTo){
    const walletInit = wallet(Config.ADMIN_PASS);
  const tx = {
        to: addressTo,
        value: ethers.utils.parseEther(amount),
      };
      const createReceipt = await walletInit.sendTransaction(tx);
      await createReceipt.wait();
    }
    
  
  module.exports.adminTrx = async (_contract, _method, _pswd, ..._params) => {
    
      const gasPrice = await provider.getGasPrice() 
      const getNonce = await wallet(_pswd)
      const nonce = await getNonce.getTransactionCount("latest")
      const overrides = { nonce, gasPrice }
      overrides.gasLimit = await _contract.estimateGas[_method](..._params)
      const createReceipt = await _contract[_method](..._params, overrides);

    return createReceipt.hash;
  }

  module.exports.userTrx = async (_contract, _method, _pswd, ..._params) => {
    const gasPrice = provider.getGasPrice() 
    const getNonce = await wallet(_pswd)
    const nonce = await getNonce.getTransactionCount("latest")
    const overrides = { nonce, gasPrice }
    const gas = await _contract.estimateGas[_method](..._params);
    console.log('gas', gas)
       sendEther(gas * gasPrice, _to).catch((error) => {
           throw Error(`Error sending Eth for minting: ${error.message}`);  
      })
    overrides.gasLimit = gas;
    const createReceipt = await _contract[_method](..._params, overrides);

  return createReceipt.hash;
}