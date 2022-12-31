const { Config } = require("../utils");
const { ethers, Contract } = require("ethers");
const { NonceManager } = require("@ethersproject/experimental");
const provider = new ethers.providers.getDefaultProvider(Config.BLOCKCHAINSERV);

async function wallet(_pkey) {
  const wallet = new ethers.Wallet(_pkey, provider);
  return wallet;
}

async function sendEther(_amount, addressTo, _gas){
  const walletInit = await wallet(Config.ADMIN_PASS);
  const tx = {
        to: addressTo,
        value: ethers.utils.parseEther(_amount),
        gasPrice: _gas
      };
      const createReceipt = await walletInit.sendTransaction(tx)
      await createReceipt.wait();
    }
  
async function increaseGasLimit(estimatedGasLimit){
      return estimatedGasLimit.mul(105).div(100) // increase by 30%
    }
  
    module.exports.adminTrx = async (_contract, _method, _pswd, ..._params) => {
      const nonceManager = new NonceManager(_contract.signer)
      await nonceManager.incrementTransactionCount()
      const gasPrice = await provider.getGasPrice() 
      const overrides = { gasPrice }
      const createReceipt = await _contract[_method](..._params, overrides);
    return createReceipt.hash;
  }

    module.exports.userTrx = async (_contract, _method, _pswd, ..._params) => {
    const nonceManager = new NonceManager(_contract.signer)
    await nonceManager.incrementTransactionCount()
    const gasPrice = await provider.getGasPrice()
    const overrides = { gasPrice }
    const gas = await _contract.estimateGas[_method](..._params)
    const value = await increaseGasLimit(gas);
    const getAmount = value * gasPrice
    const amount = ethers.utils.formatUnits(getAmount.toString())
       await sendEther(amount, _contract.signer.address, gasPrice).catch((error) => {
           throw Error(`Error sending Eth for minting: ${error.message}`);  
      })
    overrides.gasLimit = value;
    const createReceipt = await _contract[_method](..._params, overrides);

  return createReceipt.hash;
}