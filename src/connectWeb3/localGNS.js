const { Config } = require("../utils");
const { ethers } = require("ethers");
const { NonceManager } = require("@ethersproject/experimental");
const provider = new ethers.providers.getDefaultProvider(Config.BLOCKCHAINSERV);

async function wallet(_pkey) {
  const wallet = new ethers.Wallet(_pkey, provider);
  return wallet;
}

async function sendEther(_amount, addressTo, _gas){
  const walletInit = await wallet(Config.ADMIN_PASS);
  // console.log(ethers.utils.parseEther(amount).toString(), "amount", addressTo, "addressTo");
  const tx = {
        to: addressTo,
        value: ethers.utils.parseEther(_amount),
        gasPrice: _gas
      };
      const createReceipt = await walletInit.sendTransaction(tx)
      console.log( createReceipt, "createReceipt");
      await createReceipt.wait();
    }
  
async function increaseGasLimit(estimatedGasLimit){
      return estimatedGasLimit.mul(105).div(100) // increase by 30%
    }
  
    module.exports.adminTrx = async (_contract, _method, _pswd, ..._params) => {
      const nonceManager = new NonceManager(_pswd)
      await nonceManager.incrementTransactionCount()
      const gasPrice = await provider.getGasPrice() 
      const adminWallet = await wallet(_pswd)
      let nonce = await adminWallet.getTransactionCount("latest")
      const overrides = { gasPrice }
      overrides.gasLimit = await _contract.estimateGas[_method](..._params)
      const createReceipt = await _contract[_method](..._params, overrides);

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
    const amount = ethers.utils.formatUnits(value * gasPrice);
       await sendEther(amount, _contract.signer.address, gasPrice).catch((error) => {
           throw Error(`Error sending Eth for minting: ${error.message}`);  
      })
      console.log("Eth sent");
    overrides.gasLimit = value;
    const createReceipt = await _contract[_method](..._params, overrides);

  return createReceipt.hash;
}