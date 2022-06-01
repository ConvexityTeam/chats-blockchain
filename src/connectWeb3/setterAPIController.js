const connect = require("../resources/web3config.js");
const ethers = require("ethers");
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console({})],
});


const MNEMONIC = process.env.MNEMONIC;
const mnemonicWallet = ethers.Wallet.fromMnemonic(MNEMONIC, `m/44'/60'/0'/0/1`);
const accountObj = connect.web3.eth.accounts.privateKeyToAccount(
    mnemonicWallet.privateKey
  );
const deployerAccount = accountObj.address;

const BlockchainTrxAdmin = async (result) => {
  const data = result.encodeABI();
  const tx = {
    from: deployerAccount,
    to: connect.address,
    data: data,
    gas: 650000,
  };

  const signed = await connect.web3.eth.accounts.signTransaction(
    tx,
    mnemonicWallet.privateKey
  );
  const invoice = await connect.web3.eth.sendSignedTransaction(
    signed.rawTransaction
  );
  return invoice;
};

const BlockchainTrxAdminRetry = async (result) => {
  
  const nonce = (await connect.web3.eth.getTransactionCount(deployerAccount)) + 1;
  const data = result.encodeABI();
  const tx = {
    nonce: nonce,
    from: deployerAccount,
    to: connect.address,
    data: data,
    gas: 650000,
  };

  const signed = await connect.web3.eth.accounts.signTransaction(
    tx,
    mnemonicWallet.privateKey
  );
  const invoice = await connect.web3.eth.sendSignedTransaction(
    signed.rawTransaction
  );

  return invoice;
};

const BlockchainTrx = async (result, _From, _Pswd) => {
  
  const data = result.encodeABI();
  const gasPrice = await connect.web3.eth.getGasPrice()
  const getGasPrice = connect.web3.utils.fromWei(gasPrice, 'ether')
  const estimateGas = await connect.web3.eth.estimateGas({from: _From, to: connect.address,  data: data})
  
  const tx = {
    from: _From,
    to: connect.address,
    data: data,
    gas: estimateGas
  };

  const value = estimateGas * getGasPrice
const value2 = ethers.utils.parseUnits(value.toFixed(8))

  const sendGasFee = {
    from: deployerAccount,
    to: _From,
    value:  connect.web3.utils.toWei(value.toFixed(8), "ether"),
    gas: await connect.web3.eth.estimateGas({from: deployerAccount, to: _From, value: value2})
  };
  const adminSignTransfer = await connect.web3.eth.accounts.signTransaction(
    sendGasFee,
    mnemonicWallet.privateKey
  );
  
  const signed = await connect.web3.eth.accounts.signTransaction(
    tx,
    _Pswd
  );

  const adminTransferBNB = await connect.web3.eth.sendSignedTransaction(
    adminSignTransfer.rawTransaction
  );
  
  const sendtx = await connect.web3.eth.sendSignedTransaction(signed.rawTransaction);

  return sendtx

};

const BlockchainTrxRetry = async (result, _From, _Pswd) => {
  const data = result.encodeABI();
  const gasPrice = await connect.web3.eth.getGasPrice();
  const getGasPrice = connect.web3.utils.fromWei(gasPrice, 'ether');
  const estimateGas = await connect.web3.eth.estimateGas({
    from: _From,
    to: connect.address,
    data: data,
  });

  const nonce = (await connect.web3.eth.getTransactionCount(_From)) + 1;

  const tx = {
    nonce: nonce,
    from: _From,
    to: connect.address,
    data: data,
    gas: estimateGas,
  };

  const value = estimateGas * getGasPrice;
  const value2 = ethers.utils.parseUnits(value.toFixed(8));

  const sendGasFee = {
    from: deployerAccount,
    to: _From,
    value: connect.web3.utils.toWei(value.toFixed(8), 'ether'),
    gas: await connect.web3.eth.estimateGas({
      from: deployerAccount,
      to: _From,
      value: value2,
    }),
  };
  const adminSignTransfer = await connect.web3.eth.accounts.signTransaction(
    sendGasFee,
    mnemonicWallet.privateKey
  );

  const signed = await connect.web3.eth.accounts.signTransaction(tx, _Pswd);

  const adminTransferBNB = await connect.web3.eth.sendSignedTransaction(
    adminSignTransfer.rawTransaction
  );

  const sendtx = await connect.web3.eth.sendSignedTransaction(
    signed.rawTransaction
  );

  return sendtx;
};

//////////      Account Management        ////////////

/**
 * @name CreateAccount
 * @description This creates a blockchain account for both user and admins
 * with the system generated/encrypted password. It can only be called by
 * the SuperAdmin which is the   const MNEMONIC phrase on the .ENV file.
 * @returns {string} object of the address in string
 */
exports.createAccount = async () => {
  try {
    logger.info("CreateAccount");
       let account = await connect.web3.eth.accounts.create();
       const result = await connect.contract.methods.SetUserList(account.address);
       const accounted = await BlockchainTrxAdmin(result);
     logger.info("CreateAccount",accounted);
       if(accounted.status == true){
    return account;
        }
      return 'pending';
  } catch (error) {
      let err = {
        name: "Web3-CreateAccount",
        error: error.message,
      };

    throw err;
  }
};

/**
 * @name AddAdmin
 * @description This adds more Admin to the system and it called only by
 * the SuperAdmin using the BlockchainTrxAdmin function above.
 * @param {string} _AdminAddress: Blockchain Account of the Admin to be added
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.addAdmin = async (_AdminAddress) => {
  try {
    const result = await connect.contract.methods.AddAdmin(_AdminAddress);
    const sendtx = await BlockchainTrxAdmin(result);

    return sendtx.status;
  } catch (error) {
    let err = {
      name: "Web3-AddAdmin",
      error: error,
    };
    throw err;
  }
};

/**
 * @name RemoveAdmin
 * @description This removes any Admin except the SuperAdmin from the system by the Admin
 * @param {string} _AdminAddress: Blockchain Account of the Admin to be removed
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.removeAdmin = async (_AdminAddress) => {
  try {
    const result = await connect.contract.methods.RemoveAdmin(_AdminAddress);
    const sendtx = await BlockchainTrxAdmin(result);

    return sendtx.status;
  } catch (error) {
    let err = {
      name: "Web3-RemoveAdmin",
      error: error,
    };
    throw err;
  }
};

/**
 * @name AddAuthorizer
 * @description This adds more Authorizer to the system and it called only by
 * the SuperAdmin using the BlockchainTrxAdmin function above.
 * @param {string} _AdminAddress: Blockchain Account of the Authorizer to be added
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.addAuthorizer = async (_AdminAddress) => {
  try {
    const result = await connect.contract.methods.AddAuthorizer(_AdminAddress);
    const sendtx = await BlockchainTrxAdmin(result);

    return sendtx.status;
  } catch (error) {
    let err = {
      name: "Web3-AddAuthorizers",
      error: error,
    };
    throw err;
  }
};

/**
 * @name RemoveAuthorizer
 * @description This removes any Authorizer except the SuperAdmin from the system by the Admin
 * @param {string} _AdminAddress: Blockchain Account of the Authorizer to be removed
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.removeAuthorizer = async (_AdminAddress) => {
  try {
    const result = await connect.contract.methods.RemoveAuthorizer(_AdminAddress);
    const sendtx = await BlockchainTrxAdmin(result);

    return sendtx.status;
  } catch (error) {
    let err = {
      name: "Web3-RemoveAuthorizers",
      error: error,
    };
    throw err;
  }
};

/**
 * @name AddBlackList
 * @description This adds more addresses to the BlackList and it can be 
 * called by Admin using the BlockchainTrx function above.
 * @param {string} _AdminAddress: Blockchain Account of the BlackListed
 *  * @param {string} _From: Blockchain Admin Address which signs the transaction
 * @param {string} _Pswd: Blockchain Admin Address password to sign transaction
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.addBlackList = async (_AdminAddress, _From, _pwsd) => {
  try {
    const result = await connect.contract.methods.AddBlackList(_AdminAddress);
    const sendtx = await BlockchainTrx(result, _From, _pwsd);

    return sendtx.status;
  } catch (error) {
    let err = {
      name: "Web3-AddBlackList",
      error: error,
    };
    throw err;
  }
};

/**
 * @name RemoveBlackList
 * @description This removes any Authorizer except the SuperAdmin from the system by the Admin
 * @param {string} _AdminAddress: Blockchain Account of the Admin to be removed
 * @param {string} _From: Blockchain Admin Address which signs the transaction
 * @param {string} _Pswd: Blockchain Admin Address password to sign transaction
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.removeBlackList = async (_AdminAddress, _From, _pwsd) => {
  try {
    const result = await connect.contract.methods.RemoveBlackList(_AdminAddress);
    const sendtx = await BlockchainTrx(result, _From, _pwsd);

    return sendtx.status;
  } catch (error) {
    let err = {
      name: "Web3-RemoveBlackList",
      error: error,
    };
    throw err;
  }
};

/**
 * @name SetUserList
 * @description This can WhiteLists all account on the system by the Admin. This is
 * to show active accounts in the system.
 * @param {string} _Addr: Blockchain account address of the Admin user
 * @param {string} _From: Blockchain Admin Address which signs the transaction
 * @param {string} _Pswd: Blockchain Admin Address password to sign transaction
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.addUserList = async (_Addr) => {
  try {
    const result = await connect.contract.methods.SetUserList(_Addr);
    const sendtx = await BlockchainTrxAdmin(result);

    return sendtx.status;
  } catch (error) {
    let err = {
      name: "Web3-addUserList",
      error: error,
    };
    throw err;
  }
};

/**
 * @name RemoveUserList
 * @description This Removes any WhiteList Addresses from the system. Can be call by any Admin
 * @param {string} _Addr: Blockchain account to be removed
 * @param {string} _From: Blockchain Admin Address which signs the transaction
 * @param {string} _Pswd: Blockchain Admin Address password to sign transaction
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.removeUserList = async (_Addr) => {
  try {
    const result = await connect.contract.methods.RemoveUserList(_Addr);
    const sendtx = await BlockchainTrxAdmin(result);

    return sendtx.status;
  } catch (error) {
    let err = {
      name: "Web3-RemoveUserList",
      error: error,
    };
    throw err;
  }
};

//////////      Contract Management        ////////////

/**
 * @name PauseContract
 * @description This is to pause the contract to create an emergency stop
 *  and it can only be called by the SuperAdmin. 
 * 
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.pause = async () => {
  try {
    const result = await connect.contract.methods.pause();
    const sendtx = await BlockchainTrxAdmin(result);

    return sendtx.status;
  } catch (error) {
    let err = {
      name: "Web3-PauseContract",
      error: error,
    };
    throw err;
  }
};

/**
 * @name UnpauseContract
 * @description This is to unpause the contract to create an emergency stop
 *  and it can only be called by the SuperAdmin. 
 * 
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.unpause = async () => {
  try {
    const result = await connect.contract.methods.unpause();
    const sendtx = await BlockchainTrxAdmin(result);

    return sendtx.status;
  } catch (error) {
    let err = {
      name: "Web3-UnpauseContract",
      error: error,
    };
    throw err;
  }
};

/**
 * @name InitiateOwnershipTransfer
 * @description To initiate the transfer of the Ownership of the Contract to 
 * an Admin and Authorised Account and it can only be called by the SuperAdmin (Owner) 
 * 
 * @param {string} _proposedOwner: Address of the New Owner
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.initiateOwnershipTransfer = async (_proposedOwner) => {
  try {
    const result = await connect.contract.methods.initiateOwnershipTransfer(_proposedOwner);
    const sendtx = await BlockchainTrx(result, _sender, _senderPswd);

    return sendtx.status;
  } catch (error) {
    let err = {
      name: "Web3-InitiateOwnershipTransfer",
      error: error,
    };
    throw err;
  }
};

/**
 * @name CompleteOwnershipTransfer
 * @description This Completes the Contract ownership transfer process
 * and it can be called by the new Owner. 
 * 
 * @param {string} _proposedOwner: Address of the new owner
 * @param {string} _proposedOwnerPswd: The password of the new owner
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.completeOwnershipTransfer = async (_proposedOwner, _proposedOwnerPswd) => {
  try {
    const result = await connect.contract.methods.completeOwnershipTransfer();
    const sendtx = await BlockchainTrx(result, _proposedOwner, _proposedOwnerPswd);

    return sendtx.status;
  } catch (error) {
    let err = {
      name: "Web3-CompleteOwnershipTransfer",
      error: error,
    };
    throw err;
  }
};

/**
 * @name CancelOwnershipTransfer
 * @description To initiate the transfer of the Ownership of the Contract to 
 * an Admin and Authorised Account and it can only be called by the SuperAdmin (Owner) 
 * 
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.cancelOwnershipTransfer = async () => {
  try {
    const result = await connect.contract.methods.cancelOwnershipTransfer();
    const sendtx = await BlockchainTrx(result, _sender, _senderPswd);

    return sendtx.status;
  } catch (error) {
    let err = {
      name: "Web3-CancelOwnershipTransfer",
      error: error,
    };
    throw err;
  }
};

/**
 * @name SetParams
 * @description This transfer tokens from a Registered account to another 
 * registered account and it can be called by anyone who is registered on the system 
 * 
 * @param {string} _newBasisPoints: 
 * @param {string} _newMaxFee: 
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.setParams = async (_newBasisPoints, _newMaxFee) => {
  try {
    const result = await connect.contract.methods.setParams(_newBasisPoints, _newMaxFee);
    const sendtx = await BlockchainTrxAdmin(result);

    return sendtx.status;
  } catch (error) {
    let err = {
      name: "Web3-Transfer",
      error: error,
    };
    throw err;
  }
};

//////////      Transaction Management       ////////////

/**
 * @name transfer from the SuperAdmin Account
 * @description This transfer tokens from a Registered account to another 
 * registered account and it can be called by anyone who is registered on the system 
 * 
 * @param {string} _receiver: Address which will receive the tokens
 * @param {string} _value: The amount to be sent
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.transferAdmin = async (_receiver, _value) => {
  try {
    let value = connect.web3.utils.toWei(_value, "kwei");
    value = connect.web3.utils.toBN(value);
    const result = await connect.contract.methods.transfer(_receiver, Number(value));
    const sendtx = await BlockchainTrxAdmin(result);

    const event = await connect.contract.getPastEvents("Transfer", {
      fromBlock: sendtx.blockNumber,
    });

    let TransferEvent = {};
    TransferEvent.Sender = event[0].returnValues.from;
    TransferEvent.Receiver = event[0].returnValues.to;
    TransferEvent.Amount = event[0].returnValues.value;
    TransferEvent.TransactionHash = event[0].transactionHash;
    TransferEvent.BlockHash = event[0].blockHash;

    return TransferEvent;
  } catch (error) {
    let err = {
      name: "Web3-TransferBySuperAdmin",
      error: error,
    };
    throw err;
  }
};

/**
 * @name transfer
 * @description This transfer tokens from a Registered account to another 
 * registered account and it can be called by anyone who is registered on the system 
 * 
 * @param {string} _senderAddr: Address sending the tokens
 * @param {string} _senderPswd: The password of the sender
 * @param {string} _receiver: Address which will receive the tokens
 * @param {string} _value: The amount to be sent
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.transfers = async (_senderAddr, _senderPswd, _receiver, _value) => {
  try {
    let value = connect.web3.utils.toWei(_value, "kwei");
    value = connect.web3.utils.toBN(value);
    const result = await connect.contract.methods.transfer(_receiver, Number(value));

    const sendtx = await BlockchainTrx(result, _senderAddr, _senderPswd);
    
    const event = await connect.contract.getPastEvents("Transfer", {
      fromBlock: sendtx.blockNumber,
    });

    let TransferEvent = {};
    TransferEvent.Sender = event[0].returnValues.from;
    TransferEvent.Receiver = event[0].returnValues.to;
    TransferEvent.Amount = event[0].returnValues.value;
    TransferEvent.TransactionHash = event[0].transactionHash;
    TransferEvent.BlockHash = event[0].blockHash;

    return TransferEvent;
  } catch (error) {
    let err = {
      name: "Web3-Transfer",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name Minting
 * @description This Mints tokens to the SuperAdmin Account. It is only called 
 * by the SuperAdmin.
 * 
 * @param {string} _value: The amount to be Minted.
 * @returns {Boolean} object with transaction status; true or throws.
 */
exports.minting = async (_value, _mintTo) => {
  try {
    let value = connect.web3.utils.toWei(_value, "kwei");
    value = connect.web3.utils.toBN(value);
    const result = await connect.contract.methods.issue(Number(value), _mintTo);
    const sendtx = await BlockchainTrxAdmin(result);

    return sendtx.status;
  } catch (error) {
    let err = {
      name: "Web3-MintingToken",
      error: error,
    };
    throw err;
  }
};

/**
 * @name Redeeming
 * @description This redeems tokens from the SuperAdmin's Account. It is only called 
 * by the SuperAdmin.
 * @param {string} _senderAddr: Address sending the tokens
 * @param {string} _senderPswd: The password of the sender
 * @param {string} _amount: The amount to be redeemed.
 * @returns {Boolean} object with transaction status; true or throws.
 */
exports.redeeming = async (_senderAddr, _senderPswd, _amount) => {
  try {
    let value = connect.web3.utils.toWei(_amount, "kwei");
    value = connect.web3.utils.toBN(value);
    const result = await connect.contract.methods.redeem(Number(value));
    const sendtx = await BlockchainTrx(result, _senderAddr, _senderPswd);

    return sendtx.status;
  } catch (error) {
    let err = {
      name: "Web3-RedeemingToken",
      error: error,
    };
    throw err;
  }
};

/**
 * @name Approve
 * @description This redeems tokens from the SuperAdmin's Account. It is only called 
 * by the SuperAdmin.
 * @param {string} _tokenOwnerAddr: The _tokenOwnerAddr to be redeemed.
 * @param {string} _tokenOwnerPswd: The _tokenOwnerPswd to be redeemed.
 * @param {string} _spenderAddr: The _spenderAddr to be redeemed.
 * @param {string} _value: The _value to be redeemed.
 * @returns {Boolean} object with transaction status; true or throws.
 */
exports.approve = async (_tokenOwnerAddr, _tokenOwnerPswd, _spenderAddr, _value) => {
  try {
    let value = connect.web3.utils.toWei(_value, "kwei");
    value = connect.web3.utils.toBN(value);
    const result = await connect.contract.methods.approve(_spenderAddr, Number(value));
    const sendtx = await BlockchainTrx(result, _tokenOwnerAddr,_tokenOwnerPswd);
    const event = await connect.contract.getPastEvents("Approval", {
          fromBlock: sendtx.blockNumber,
        });

        let TransferEvent = {};
        TransferEvent.TokenOwner = event[0].returnValues.owner;
        TransferEvent.TokenSpender = event[0].returnValues.spender;
        TransferEvent.Amount = event[0].returnValues.value;
        TransferEvent.TransactionHash = event[0].transactionHash;
        TransferEvent.BlockHash = event[0].blockHash;

        return TransferEvent;
  } catch (error) {
    let err = {
      name: "Web3-Approve",
      error: error,
    };
    throw err;
  }
};

/**
 * @name TransferFrom
 * @description This enables the transfer of tokens from Beneficiary to vendor.
 * It can be called by any registered user
 * @param {string} _tokenOwerAddr: The _tokenOwerAddr to be transfer from.
 * @param {string} _to: The _newOwerAddr to be transfer to.
 * @param {string} _spenderAddr: The _spenderAddr to send from.
 * @param {string} _spenderPwsd: The _spenderPwsd the password of the msg.sender.
 * @param {string} _value: The amount to be redeemed.
 * @returns {Boolean} object with transaction status; true or throws.
 */
exports.transferFrom = async (_tokenOwnerAddr, _to, _spenderAddr, _spenderPwsd, _value) => {
    try {
        let value = connect.web3.utils.toWei(_value, "kwei");
        value = connect.web3.utils.toBN(value);
        const result = await connect.contract.methods.transferFrom(_tokenOwnerAddr, _to, Number(value));
        const sendtx = await BlockchainTrx(result, _spenderAddr, _spenderPwsd);
        
        const event = await connect.contract.getPastEvents("Transfer", {
          fromBlock: sendtx.blockNumber,
        });

        let TransferEvent = {};
        TransferEvent.Sender = event[0].returnValues.from;
        TransferEvent.Receiver = event[0].returnValues.to;
        TransferEvent.Amount = event[0].returnValues.value;
        TransferEvent.TransactionHash = event[0].transactionHash;
        TransferEvent.BlockHash = event[0].blockHash;

        return TransferEvent;
    } catch (error) {
        let err = {
            name: "Web3-TransferFrom",
            error: error,
        };
        throw err;
    }
};

/**
 * @name DestroyBlackFunds
 * @description This distroys the tokens of a Bad act which has been BlackListed.
 * It is only called by the SuperAdmin.
 * 
 * @param {string} _evilUser: The address whose funds are to be distroyed.
 * @returns {Boolean} object with transaction status; true or throws.
 */
exports.destroyBlackFunds = async (_evilUser) => {
  try {
    const result = await connect.contract.methods.DestroyBlackFunds(_evilUser);
    const sendtx = await BlockchainTrxAdmin(result);

    const event = await connect.contract.getPastEvents("DestroyedBlackFunds", {
      fromBlock: sendtx.blockNumber,
    });

    let DestroyBlackFundsEvent = {};
    DestroyBlackFundsEvent.BlackListedUser = event[0].returnValues._User;
    DestroyBlackFundsEvent.DirtyFunds = event[0].returnValues._amount;
    DestroyBlackFundsEvent.TransactionHash = event[0].transactionHash;
    DestroyBlackFundsEvent.BlockHash = event[0].blockHash;

    return DestroyBlackFundsEvent;
  } catch (error) {
    let err = {
      name: "Web3-DestroyBlackFunds",
      error: error,
    };
    throw err;
  }
};
