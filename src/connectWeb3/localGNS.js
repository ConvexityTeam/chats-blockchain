const { Config } = require("../utils");
const { ethers, Contract } = require("ethers");
const { NonceManager } = require("@ethersproject/experimental");
const provider = new ethers.providers.getDefaultProvider(Config.BLOCKCHAINSERV);

async function wallet(_pkey) {
  const wallet = new ethers.Wallet(_pkey, provider);
  return wallet;
}

async function sendEther(amount, addressTo){
  const walletInit = await wallet(Config.ADMIN_PASS);
  const tx = {
        to: addressTo,
        value: ethers.utils.parseEther(amount),
      };
      const createReceipt = await walletInit.sendTransaction(tx);
      await createReceipt.wait();
    }
  
async function increaseGasLimit(estimatedGasLimit){
      return estimatedGasLimit.mul(105).div(100) // increase by 30%
    }
  
  module.exports.adminTrx = async (_contract, _method, _pswd, ..._params) => {
    
      
      // const adminWallet = await wallet(_pswd)
      // let nonce = await adminWallet.getTransactionCount("latest")
      // const nonceManager = new NonceManager(_pswd)
      // await nonceManager.incrementTransactionCount()
      
      const gasPrice = await provider.getGasPrice() 
      const overrides = { gasPrice }
      // overrides.gasLimit = await _contract.estimateGas[_method](..._params)
      const createReceipt = await _contract[_method](..._params, overrides);
    // const mined = await createReceipt.wait();
    return createReceipt.hash;
  }

  module.exports.userTrx = async (_contract, _method, _pswd, ..._params) => {
    const nonceManager = new NonceManager(_pswd)
    await nonceManager.incrementTransactionCount()
    const gasPrice = await provider.getGasPrice()
    // const userWallet = await wallet(_pswd)
    // let nonce = await userWallet.getTransactionCount("latest")
    const overrides = { gasPrice }
    const gas = await _contract.estimateGas[_method](..._params);
    const value = await increaseGasLimit(gas);
    console.log("Parameters", ...params, "Sender", _contract.signer.address)

       await sendEther(ethers.utils.formatUnits((value * gasPrice).toString()).toString(), _contract.signer.address).catch((error) => {
           throw Error(`Error sending Eth for minting: ${error.message}`);  
      })
    overrides.gasLimit = gas;
    const createReceipt = await _contract[_method](..._params, overrides);

  return createReceipt.hash;
}