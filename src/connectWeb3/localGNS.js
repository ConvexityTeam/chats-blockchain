const { Config } = require("../utils");
const {  web3 } = require("../resources/web3config.js");
const ethers = require("ethers");
const Transaction  = require("@ethereumjs/tx").Transaction;
const Common = require("@ethereumjs/common").default;
const { Chain, Hardfork} = require("@ethereumjs/common")
const MNEMONIC = process.env.MNEMONIC;
const mnemonicWallet = ethers.Wallet.fromMnemonic(MNEMONIC, `m/44'/60'/0'/0/1`);
const accountObj = web3.eth.accounts.privateKeyToAccount(
    mnemonicWallet.privateKey
  );
const deployerAccount = accountObj.address;
const commons = new Common({ chain: Chain.Mainnet});

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
    gasLimit: estimateGas,
    nonce:  nonce
  };
  const signed = await web3.eth.accounts.signTransaction(
    txParams,
    mnemonicWallet.privateKey
  );
  // const tx = Transaction.fromTxData(txParams, { common: commons });
  // const privateKey = Buffer.from(mnemonicWallet.privateKey.slice(2), "hex");
  // tx.sign(privateKey);
  // console.log(tx, 'tx')
  // const receipt = await web3.eth.sendSignedTransaction("0x" + tx.serialize().toString("hex"));
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