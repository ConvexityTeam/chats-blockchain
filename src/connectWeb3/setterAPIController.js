const {tokenContract, nftContract, operationsContract} = require("../resources/web3config.js");
const Web3 = require('web3');
const web3 = new Web3();
const { userTrx, adminTrx } = require("./localGNS.js");
const { signERC2612Permit } = require('eth-permit');
const ethers = require("ethers");
const { Config } = require("../utils");
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console({})],
});


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
       const account = web3.eth.accounts.create();
       const result = operationsContract(Config.ADMIN_PASS)
       const tranxHash = adminTrx(result, 'SetUserList', Config.ADMIN_PASS, account.address);
     logger.info("Account created", tranxHash);
      return tranxHash;
  } catch (error) {
    let err = {
      name: "Web3-CreateAccount",
      error: error,
    };
    throw err;
}
}

/**
 * @name AddAdmin
 * @description This adds more Admin to the system and it called only by
 * the SuperAdmin using the BlockchainTrxAdmin function above.
 * @param {string} _adminAddress: Blockchain Account of the Admin to be added
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.addAdmin = async (_adminAddress) => {
  try {
    logger.info("Add Admin");
    const result = operationsContract(Config.ADMIN_PASS)
    const tranxHash = adminTrx(result, 'AddAdmin', Config.ADMIN_PASS, _adminAddress)
    logger.info("Added Admin",tranxHash)
    return tranxHash
  } catch (error) {
    logger.error("Add Admin",error);
    let err = {
      name: "Web3-AddAdmin",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name RemoveAdmin
 * @description This removes any Admin except the SuperAdmin from the system by the Admin
 * @param {string} _adminAddress: Blockchain Account of the Admin to be removed
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.removeAdmin = async (_adminAddress) => {
  try {
    logger.info("Remove Admin");
    const result = operationsContract(Config.ADMIN_PASS)
    const tranxHash = adminTrx(result, 'RemoveAdmin', Config.ADMIN_PASS, _adminAddress)
    logger.info("Admin Removed",tranxHash)
    return tranxHash
  } catch (error) {
    let err = {
      name: "Web3-RemoveAdmin",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name AddAuthorizer
 * @description This adds more Authorizer to the system and it called only by
 * the SuperAdmin using the BlockchainTrxAdmin function above.
 * @param {string} _adminAddress: Blockchain Account of the Authorizer to be added
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.addAuthorizer = async (_authAddress) => {
  try {
    logger.info("Add Authorizer", _authAddress);
    const result = operationsContract(Config.ADMIN_PASS)
    const tranxHash = adminTrx(result, 'AddAuthorizer', Config.ADMIN_PASS, _authAddress)
    logger.info("Authorizer Added",tranxHash)
    return tranxHash
  } catch (error) {
    let err = {
      name: "Web3-AddAuthorizers",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name RemoveAuthorizer
 * @description This removes any Authorizer except the SuperAdmin from the system by the Admin
 * @param {string} _authAddress: Blockchain Account of the Authorizer to be removed
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.removeAuthorizer = async (_authAddress) => {
  try {
    logger.info("Remove Authorizer", _authAddress);
    const result = operationsContract(Config.ADMIN_PASS)
    const tranxHash = adminTrx(result, 'RemoveAuthorizer', Config.ADMIN_PASS, _authAddress)
    logger.info("Authorizer Removed",tranxHash)
    return tranxHash
  } catch (error) {
    let err = {
      name: "Web3-RemoveAuthorizers",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name AddBlackList
 * @description This adds more addresses to the BlackList and it can be 
 * called by Admin using the BlockchainTrx function above.
 * @param {string} _address: Blockchain Account of the BlackListed
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.addBlackList = async (_address) => {
  try {
    logger.info("Add Blacklist", _address);
    const result = operationsContract(Config.ADMIN_PASS)
    const tranxHash = adminTrx(result, 'AddBlackList', Config.ADMIN_PASS, _address)
    logger.info("Blacklist Added",tranxHash)
    return tranxHash
  } catch (error) {
    let err = {
      name: "Web3-AddBlackList",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name RemoveBlackList
 * @description This removes any Authorizer except the SuperAdmin from the system by the Admin
 * @param {string} _adminAddress: Blockchain Account of the Admin to be removed
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.removeBlackList = async (_address) => {
  try {
    logger.info("Remove Blacklist", _address);
    const result = operationsContract(Config.ADMIN_PASS)
    const tranxHash = adminTrx(result, 'RemoveBlackList', Config.ADMIN_PASS, _address)
    logger.info("Blacklist Removed",tranxHash)
    return tranxHash
  } catch (error) {
    let err = {
      name: "Web3-RemoveBlackList",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name SetUserList
 * @description This can WhiteLists all account on the system by the Admin. This is
 * to show active accounts in the system.
 * @param {string} _address: Blockchain account address of the Admin user
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.addUserList = async (_address) => {
  try {
    logger.info("Add User", _address);
    const result = operationsContract(Config.ADMIN_PASS)
    const tranxHash = adminTrx(result, 'SetUserList', Config.ADMIN_PASS, _address)
    logger.info("User Added",tranxHash)
    return tranxHash
  } catch (error) {
    logger.error("User Added", JSON.stringify(error.message));
    let err = {
      name: "Web3-addUserList",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name RemoveUserList
 * @description This Removes any WhiteList Addresses from the system. Can be call by any Admin
 * @param {string} _address: Blockchain account to be removed
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.removeUserList = async (_address) => {
  try {
    logger.info("Remove User", _address);
    const result = operationsContract(Config.ADMIN_PASS)
    const tranxHash = adminTrx(result, 'RemoveUserList', Config.ADMIN_PASS, _address)
    
    return tranxHash
  } catch (error) {
    logger.error("User Removed", JSON.stringify(error.message));
    let err = {
      name: "Web3-RemoveUserList",
      error: error.message,
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
    logger.info("Pause Operation");
    const result = operationsContract(Config.ADMIN_PASS)
    const tranxHash = adminTrx(result, 'pause', Config.ADMIN_PASS)

    return tranxHash
  } catch (error) {
    logger.error("Operation Paused", JSON.stringify(error.message));
    let err = {
      name: "Web3-PauseContract",
      error: error.message,
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
    logger.info("UnPause Operation");
    const result = operationsContract(Config.ADMIN_PASS)
    const tranxHash = adminTrx(result, 'unpause', Config.ADMIN_PASS)
    logger.info("Operation UnPaused",tranxHash)
    return tranxHash
  } catch (error) {
    logger.error("Operation UnPaused", JSON.stringify(error.message));
    let err = {
      name: "Web3-UnpauseContract",
      error: error.message,
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
    const result = await contract.methods.initiateOwnershipTransfer(_proposedOwner);
    const sendtx = await BlockchainTrx(result, _sender, _senderPswd);

    return sendtx.status;
  } catch (error) {
    let err = {
      name: "Web3-InitiateOwnershipTransfer",
      error: error.message,
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
    const result = await contract.methods.completeOwnershipTransfer();
    const sendtx = await BlockchainTrx(result, _proposedOwner, _proposedOwnerPswd);

    return sendtx.status;
  } catch (error) {
    let err = {
      name: "Web3-CompleteOwnershipTransfer",
      error: error.message,
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
    const result = await contract.methods.cancelOwnershipTransfer();
    const sendtx = await BlockchainTrx(result, _sender, _senderPswd);

    return sendtx.status;
  } catch (error) {
    let err = {
      name: "Web3-CancelOwnershipTransfer",
      error: error.message,
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
    logger.info("Set Fee Params");
    const result = tokenContract(Config.ADMIN_PASS)
    const tranxHash = adminTrx(result, 'setParams', Config.ADMIN_PASS, _newBasisPoints, _newMaxFee)
    
    return tranxHash
  } catch (error) {
    logger.error("Fee Params Set", JSON.stringify(error.message));
    let err = {
      name: "Web3-Params",
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
    const value = ethers.utils.parseUnits(_value, "mwei")

    logger.info("Admin Transfer");
    const result = tokenContract(Config.ADMIN_PASS)
    const tranxHash = adminTrx(result, 'transfer', Config.ADMIN_PASS, _receiver, value)
    logger.info("Admin Transferred",tranxHash)

    return tranxHash
  } catch (error) {
    logger.error("Admin Transfer", JSON.stringify(error.message))
    let err = {
      name: "Web3-TransferBySuperAdmin",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name transfer
 * @description This transfer tokens from a Registered account to another 
 * registered account and it can be called by anyone who is registered on the system 
 * 
 * @param {string} _senderPswd: The password of the sender
 * @param {string} _receiver: Address which will receive the tokens
 * @param {string} _value: The amount to be sent
 * @returns {Boolean} object with transaction status; true or throws
 */
exports.transfers = async (_senderPswd, _receiver, _value) => {
  try {
    const value = ethers.utils.parseUnits(_value, "mwei")
    logger.info("User Transfer");
    const result = tokenContract(_senderPswd)
    const tranxHash = userTrx(result, 'transfer', _senderPswd, _receiver, value.toString())

    return tranxHash
  } catch (error) {
    logger.error("User Transfer", JSON.stringify(error.message))
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
    logger.info("Minting");
    let value = ethers.utils.parseUnits(_value, "mwei")
    const result = tokenContract(Config.ADMIN_PASS)
    const tranxHash = adminTrx(result, 'mint', Config.ADMIN_PASS, value, _mintTo)

    return tranxHash
  } catch (error) { 
    logger.error("Minting", JSON.stringify(error.message))
    let err = {
      name: "Web3-MintingToken",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name Redeeming
 * @description This redeems tokens from the SuperAdmin's Account. It is only called 
 * by the SuperAdmin.
 * @param {string} _senderPswd: The password of the sender
 * @param {string} _amount: The amount to be redeemed.
 * @returns {Boolean} object with transaction status; true or throws.
 */
exports.redeeming = async (_senderPswd, _amount) => {
  try {
    let value = ethers.utils.parseUnits(_amount, "mwei");

    logger.info("Token Redeem");
    const result = tokenContract(_senderPswd)
    const tranxHash = userTrx(result, 'redeem', _senderPswd, value)

    return tranxHash
  } catch (error) {
    logger.error("Token Redeem", JSON.stringify(error.message))
    let err = {
      name: "Web3-RedeemingToken",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name Approve
 * @description This redeems tokens from the SuperAdmin's Account. It is only called 
 * by the SuperAdmin.
 * @param {string} _tokenOwnerPswd: The _tokenOwnerPswd to be redeemed.
 * @param {string} _spenderAddr: The _spenderAddr to be redeemed.
 * @param {string} _value: The _value to be redeemed.
 * @returns {Boolean} object with transaction status; true or throws.
 */
exports.approve = async ( _tokenOwnerPswd, _spenderAddr, _value) => {
  try {
        const value = ethers.utils.parseUnits(_value, "mwei");
        // logger.info("Approve");
        // const wallet = tokenContract(_tokenOwnerPswd);
        // const nonce = await wallet.getTransactionCount("latest");
        // // const blockTime = await web3.eth.getBlock('latest');
        // const deadline =  ethers.constants.MaxUint256;
        // console.log("deadline", deadline)
        // const signature = await signERC2612Permit(wallet, tokenAddress, _tokenOwnerAddr, _spenderAddr, value, deadline, nonce);
        // const result = tokenContract.permit(_tokenOwnerAddr, _spenderAddr, value, signature.deadline, signature.v, signature.r, signature.s)
        // const sendtx = await userTrx(result, tokenAddress, _tokenOwnerAddr,_tokenOwnerPswd);

      logger.info("Token Approve");
      const result = tokenContract(_tokenOwnerPswd)
      const tranxHash = userTrx(result, 'increaseAllowance', _tokenOwnerPswd, _spenderAddr, value)
  
      return tranxHash
  } catch (error) {
    logger.error("Token Approve", JSON.stringify(error.message))
    let err = {
      name: "Web3-Approve",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name Approve
 * @description This redeems tokens from the SuperAdmin's Account. It is only called 
 * by the SuperAdmin.
 * @param {string} _tokenOwnerPswd: The _tokenOwnerPswd to be redeemed.
 * @param {string} _spenderAddr: The _spenderAddr to be redeemed.
 * @param {string} _value: The _value to be redeemed.
 * @returns {Boolean} object with transaction status; true or throws.
 */
 exports.disApprove = async (_tokenOwnerPswd, _spenderAddr, _value) => {
  try {
      const value = ethers.utils.parseUnits(_value, "mwei");
      logger.info("Token Disapprove");
      const result = tokenContract(_tokenOwnerPswd)
      const tranxHash = userTrx(result, 'decreaseAllowance', _tokenOwnerPswd, _spenderAddr, value)
  
      return tranxHash
  } catch (error) {
    logger.error("Token Disapprove", JSON.stringify(error.message))
    let err = {
      name: "Web3-Disapprove",
      error: error.message,
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
 * @param {string} _spenderPwsd: The _spenderPwsd the password of the msg.sender.
 * @param {string} _value: The amount to be redeemed.
 * @returns {Boolean} object with transaction status; true or throws.
 */
exports.transferFrom = async (_tokenOwnerAddr, _receiverAddr, _spenderPwsd, _value) => {
    try {
        let value = ethers.utils.parseUnits(_value, "mwei");

        logger.info("Token TransferFrom");
        const result = tokenContract(_spenderPwsd)
        const tranxHash = userTrx(result, 'transferFrom', _spenderPwsd, _tokenOwnerAddr, _receiverAddr, value)

        return tranxHash
    } catch (error) {
      logger.error("Transferred Token From", JSON.stringify(error.message))
        let err = {
            name: "Web3-TransferFrom",
            error: error.message,
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
    logger.info("User Fund Destroy");
    const result = tokenContract(Config.ADMIN_PASS)
    const tranxHash = adminTrx(result, 'DestroyBlackFunds', Config.ADMIN_PASS, _evilUser)

    return tranxHash
  } catch (error) {
    logger.error("Destroyed User Fund", JSON.stringify(error.message))
    let err = {
      name: "Web3-DestroyBlackFunds",
      error: error.message,
    };
    throw err;
  }
};

// nft setter functions
exports.mintNFT = async (receiver_, tokenURI_, collectionIndex_)=>{
  try {
    logger.info("Mint NFT");
    const result = nftContract(Config.ADMIN_PASS) 
    const tranxHash = adminTrx(result, 'mintNFT', Config.ADMIN_PASS,  receiver_, tokenURI_, collectionIndex_);

    return tranxHash
  } catch (error) {
    logger.error("Mint NFT", JSON.stringify(error.message))
    let err = {
      name: "Web3-Mint NFT",
      error: error.message,
    };
    throw err;
  }
}

exports.burnNFT = async (tokenID_, collectionIndex_)=>{
  try {
    logger.info("Burn NFT");
    const result = nftContract(Config.ADMIN_PASS)
    const tranxHash = adminTrx(result, 'burnNFT', Config.ADMIN_PASS, tokenID_, collectionIndex_);
    return tranxHash
  } catch (error) {
    logger.error("Burn NFT", JSON.stringify(error.message))
    let err = {
      name: "Web3-Burn NFT",
      error: error.message,
    };
    throw err;
  }
}


exports.NFTtransferFrom = async (sender_, receiver_, tokenID_, collectionIndex_)=>{
  try {
    logger.info("Transfer NFT");
    const result = nftContract(Config.ADMIN_PASS)
    const tranxHash = userTrx(result, 'NFTtransferFrom_', Config.ADMIN_PASS, sender_, receiver_, tokenID_, collectionIndex_);
    return tranxHash
  } catch (error) {
    logger.error("Transfer NFT", JSON.stringify(error.message))
    let err = {
      name: "Web3-Transfer NFT",
      error: error.message,
    };
    throw err;
  }
}

exports.NFTsetApprovalForAll = async (operator_, approvalStatus, collectionIndex_)=>{
  try {
    logger.info("NFT set approval for all");
    const result = nftContract(Config.ADMIN_PASS)
    const tranxHash = userTrx(result, 'NFTsetApprovalForAll_', Config.ADMIN_PASS, operator_, approvalStatus, collectionIndex_);
    return tranxHash
  } catch (error) {
    logger.error("NFT set approval for all", JSON.stringify(error.message))
    let err = {
      name: "Web3-NFT set approval for all",
      error: error.message,
    };
    throw err;
  }
}

exports.NFTapprove = async (receiver_, tokenID_, collectionIndex_)=>{
  try {
    logger.info("Approve NFT");
    const result = nftContract(Config.ADMIN_PASS)
    const tranxHash = userTrx(result, 'NFTapprove_', Config.ADMIN_PASS, receiver_, tokenID_, collectionIndex_);
    return tranxHash
  } catch (error) {
    logger.error("Approve NFT", JSON.stringify(error.message))
    let err = {
      name: "Approve NFT",
      error: error.message,
    };
    throw err;
  }
}

exports.setNFTlimit = async (limit_, collectionIndex_)=>{
  try {
    logger.info("set NFT miniting limit");
    const result = nftContract(Config.ADMIN_PASS)
    const tranxHash = adminTrx(result, 'setNFTlimit', Config.ADMIN_PASS, limit_, collectionIndex_);
    return tranxHash
  } catch (error) {
    logger.error("set NFT miniting limit", JSON.stringify(error.message))
    let err = {
      name: "set NFT miniting limit",
      error: error.message,
    };
    throw err;
  }
}

exports.deployCollection = async (contractName_, collectionName_, contractSymbol_)=>{
  try {
    logger.info("deploy an instance of the collection");
    const result = nftContract(Config.ADMIN_PASS)
    const tranxHash = adminTrx(result, 'deployNFTCollection', Config.ADMIN_PASS,contractName_, collectionName_, contractSymbol_);
    return tranxHash
  } catch (error) {
    logger.error("deploy an instance of the collection", JSON.stringify(error.message))
    let err = {
      name: "deploy an instance of the collection",
      error: error.message,
    };
    throw err;
  }
}



