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
    
  
  module.exports.adminTrx = async (_contract, _gas, _method, _pswd, ..._parameters) => {
    
      const gasPrice = await provider.getGasPrice() 
      const getNonce = await wallet(_pswd)
      const nonce = await getNonce.getTransactionCount("latest")
      const overrides = { nonce, gasPrice }
      overrides.gasLimit = _gas
      let params = ''
      for (let index = 0; index < _parameters.length; index++) params += (_parameters.length <= 1)? _parameters[index] :  _parameters[index] + ','
      params = (_parameters.length == 1)? params : params.slice(0, -1)
      const createReceipt = await _contract[_method](params, overrides);

    return createReceipt.hash;
  }

  module.exports.userTrx = async (_to, _contract, _method, _pswd, ..._parameters) => {

    const gasPrice = provider.getGasPrice() 
    const getNonce = await wallet(_pswd)
    const nonce = await getNonce.getTransactionCount("latest")
    const overrides = { nonce, gasPrice }
    const gas = await _contract.estimateGas[_method](_parameters, [ overrides ] );
       sendEther(gas * gasPrice, _to).catch((error) => {
           throw Error(`Error sending Eth for minting: ${error.message}`);  
   })

// add missing arguments to call ethers write function
    let params = ''
    for (let index = 0; index < _parameters.length; index++) para += (_parameters.length <= 1)? _parameters[index] :  _parameters[index] + ','
    params = (_parameters.length == 1)? params : params.slice(0, -1)
    overrides.gasLimit = gas;
    const createReceipt = await _contract[_method](_params, [ overrides ]);

  return createReceipt.hash;
}
















module.exports.BlockchainTrxAdmin = async (_result, _nonce, _address) => {
  const data = _result.encodeABI();
  const estimateGas = await web3.eth.estimateGas({from: deployerAccount, to: _address,  data: data})
  if(_nonce > 0) {
    let nonce = await web3.eth.getTransactionCount(deployerAccount, pending) + _nonce;
  }else{
    nonce = await web3.eth.getTransactionCount(deployerAccount)
  }
 
  const txParams = {
    from: deployerAccount,
    to: _address,
    data: data,
    // gasLimit: estimateGas,
    // nonce:  nonce
  };
  const signed = await web3.eth.accounts.signTransaction(
    txParams,
    Config.ADMIN_PASS
  );

  const receipt = await web3.eth.sendSignedTransaction(
    signed.rawTransaction
  );

  console.log(receipt)
  return receipt;
};


module.exports.BlockchainTrx = async (result, _address, _from, _pswd) => {
  const data = result.encodeABI();
  const estimateGas = await web3.eth.estimateGas({from: _from, to: _address,  data: data})
  const nonce =   await web3.eth.getTransactionCount(_from)
  const txParams = {
    nonce: nonce,
    from: _from,
    to: _address,
    data: data,
    gasLimit: estimateGas
  };
  // const tx = new Transaction(txParams);
  // tx.sign(Buffer.from(_Pswd, "hex"));
  await gasless(_from, _address, data)
  // const receipt = await web3.eth.sendSignedTransaction(
  //   "0x" + tx.serialize().toString("hex")
  // );
//   console.log(receipt)
const signed = await web3.eth.accounts.signTransaction(
  txParams,
  _pswd
);

const receipt = await web3.eth.sendSignedTransaction(
  signed.rawTransaction
);

  return receipt

};

const gasless = async (_from, _address, _data) => {

    const gasPrice = await web3.eth.getGasPrice()
    const getGasPrice = web3.utils.fromWei(gasPrice, 'ether')
   
    const estimateGas = await web3.eth.estimateGas({from: _from, to: _address,  data: _data})
    const value = estimateGas * getGasPrice
    const value2 = ethers.utils.parseUnits(value.toFixed(8))

  const sendGasFee = {
    from: deployerAccount,
    to: _from,
    value:  web3.utils.toWei(value.toFixed(8), "ether"),
    gas: await web3.eth.estimateGas({from: deployerAccount, to: _from, value: value2})
  };
  
  const adminSignTransfer = await web3.eth.accounts.signTransaction(
    sendGasFee,
    mnemonicWallet.privateKey)

     await web3.eth.sendSignedTransaction(
        adminSignTransfer.rawTransaction
      );
};