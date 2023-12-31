const {
  getTokenContract, 
  getOpsContract, 
  getNFTContract,
  getEscrowContract,
  getEscrowFactoryContract
} = require("../resources/web3config.js");
const ethers = require('ethers');
//////////      Get Contract Details        ////////////

/**
 * @name GetName
 * @description This gets contract Name
 * 
 * @returns {string} Name of the CHATS Contract
 */
exports.getName = async () => {
  try {
    const result = await getTokenContract.name();
    return result;
  } catch (error) {
    const err = {
      name: "Web-GetName",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name GetOwner
 * @description This gets contract Owner
 * 
 * @returns {string} Owner of the FreeMoney Contract
 */
exports.getOwner = async () => {
  try {
    const result = await getTokenContract.owner();
    return result;
  } catch (error) {
    const err = {
      name: "Web-GetOwner",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name IsOwner
 * @description This checks if it is contract Owner
 * 
 * @param {string} _address: Address to be checked
 * @returns {bool} Owner of the FreeMoney Contract
 */
exports.isOwner = async (_address) => {
  try {
    const result = await getTokenContract.isOwner(_address);
    return result;
  } catch (error) {
    const err = {
      name: "Web-isOwner",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name IsPaused
 * @description This checks if it is contract Owner
 * 
 * @returns {bool} returns true if the contract is on paused
 */
exports.isPaused = async () => {
  try {
    const result = await getTokenContract.paused();
    return result;
  } catch (error) {
    const err = {
      name: "Web-isPaused",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name TotalSupply
 * @description This checks the totalSupply od tokens
 * 
 * @returns {bool} returns the Token Total Supply
 */
exports.totalSupply = async () => {
  try {
    const value = await getTokenContract.totalSupply();
    const result = ethers.utils.formatUnits(value, "mwei");
    return ethers.utils.commify(result);
  } catch (error) {
    const err = {
      name: "Web-TotalSupply",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name TotalIssued
 * @description This checks the total issued tokens
 * 
 * @returns {bool} returns sum total of every Token ever minted
 */
exports.totalIssued = async (_From) => {
  try {
    const value = await getTokenContract.totalIssued();
    const result = ethers.utils.formatUnits(value, "mwei");
    return ethers.utils.commify(result);
  } catch (error) {
    const err = {
      name: "Web-TotalIssued",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name TotalRedeemed
 * @description This checks the total redeemed tokens
 * 
 * @returns {bool} returns sum total of every token ever redeemed
 */
exports.totalRedeemed = async (_From) => {
  try {
    const value = await getTokenContract.totalRedeemed();
    const result = ethers.utils.formatUnits(value, "mwei");
    return ethers.utils.commify(result);
  } catch (error) {
    const err = {
      name: "Web-TotalRedeemed",
      error: error.message,
    };
    throw err;
  }
};

//////////      Transaction Details         ////////////

/**
 * @name Allowance
 * @description This is the allowed amount which a particular account
 * holder has permitted another account, _spender, to transfer on his behave.
 * 
 * @param {string} _tokenOwner The address owning the account
 * @param {string} _spender The address who can spend on the owner behave
 * 
 * @returns {string} returns the remaining amount which can be transfered
 */
exports.allowance = async (_tokenOwner, _spender) => {
  try {
    const value = await getTokenContract.allowance(_tokenOwner, _spender);
    const result = ethers.utils.formatUnits(value, "mwei");
    return ethers.utils.commify(result);
  } catch (error) {
    const err = {
      name: "Web-Allowance",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name BalanceOf
 * @description This checks the tokens of an account
 * 
 * @param {string} _account The address to get its balance
 * 
 * @returns {bool} returns Balance of an Account
 */
exports.balanceOf = async (_account) => {
  try {
    
    const value = await getTokenContract.balanceOf(_account);
    const result = ethers.utils.formatUnits(value, "mwei");
    return ethers.utils.commify(result);
  } catch (error) {
    const err = {
      name: "Web-BalanceOf",
      error: error.message,
    };
    throw err;
  }
};

//////////      Get User Groups        ////////////

/**
 * @name GetUsersList
 * @description This is to know all registered accounts
 * 
 * @returns {bool} returns a list of registered accounts
 */
exports.getUsersList = async () => {
  try {
    const result = await getTokenContract.GetUsersList();
    return result;
  } catch (error) {
    const err = {
      name: "Web-GetUsersList",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name GetAdminList
 * @description This is know all admins
 * 
 * @returns {bool} returns a list of all Admins
 */
exports.getAdminList = async () => {
  try {
    const result = await getTokenContract.GetAdminList();
    return result;
  } catch (error) {
    const err = {
      name: "Web-GetAdminList",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name GetAuthorizerList
 * @description This is to know all Authorisers
 * 
 * @returns {bool} returns a list of all Authorisers
 */
exports.getAuthorizerList = async () => {
  try {
    const result = await getTokenContract.GetAuthorizerList();
    return result;
  } catch (error) {
    const err = {
      name: "Web-GetAuthorizerList",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name GetBlackListed
 * @description This is to know all BlackListed Accounts
 * 
 * @returns {bool} returns a list of all BlackListed Accounts
 */
exports.getBlackListed = async () => {
  try {
    const result = await getTokenContract.GetBlackListed();
    return result;
  } catch (error) {
    const err = {
      name: "Web-GetBlackListed",
      error: error.message,
    };
    throw err;
  }
};

//////////      Account Checks        ////////////

/**
 * @name isUserListed
 * @description This is to know if an account is User
 *
 * @returns {bool} returns true if the account is a registered User
 */
exports.isUserListed = async (_account) => {
  try {
    const result = await getTokenContract.isUserListed(_account);
    return result;
  } catch (error) {
    const err = {
      name: "Web3-isUserListed",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name isAdmin
 * @description This is to know if an account is Admin
 * 
 * @returns {bool} returns true if aacount is Admin
 */
exports.isAdmin = async (_account) => {
  try {
    const result = await getTokenContract.isAdmin(_account);
    return result;
  } catch (error) {
    const err = {
      name: "Web3-isAdmin",
      error: error.message,
    };
    throw err;
  }
};

/**
 * @name isAuthorizer
 * @description This is to know if an account is Authorizer
 *
 * @returns {bool} returns true if the account is an Authorizer
 */
exports.isAuthorizer = async (_account) => {
  try {
    const result = await getTokenContract.isAuthorizer(_account);
    return result;
  } catch (error) {
    const err = {
      name: "Web3-isAuthorizer",
      error: error.message,
    };
    throw err;
  }
};


/**
 * @name isBlackListed
 * @description This is to know if an account is BlackListed
 *
 * @returns {bool} returns true if the account is a BlackListed User
 */
exports.isBlackListed = async (_account) => {
  try {
    const result = await getTokenContract.isBlackListed(_account);
    return result;
  } catch (error) {
    const err = {
      name: "Web3-isBlackListed",
      error: error.message,
    };
    throw err;
  }
};

// nft getter functions
exports.NFTgetName = async (contractIndex_) => {
  try {
    const result = await getNFTContract.NFTgetName(contractIndex_);
    return result;
  } catch (error) {
    const err = {
      name: "Web3-get collection name",
      error: error.message,
    };
    throw err;
  }
};

exports.NFTgetSymbol = async (contractIndex_) => {
  try {
    const result = await getNFTContract.NFTgetSymbol(contractIndex_);
    return result;
  } catch (error) {
    const err = {
      name: "Web3-get collection symbol",
      error: error.message,
    };
    throw err;
  }
};

exports.NFTgetOwner = async (tokenID_, contractIndex_) => {
  try {
    const result = await getNFTContract.NFTgetOwner(tokenID_, contractIndex_);
    return result;
  } catch (error) {
    const err = {
      name: "Web3-get NFT owner",
      error: error.message,
    };
    throw err;
  }
};

exports.NFTgetBalance = async (owner_, contractIndex_) => {
  try {
    const result = await getNFTContract.NFTgetBalance(owner_, contractIndex_);
    return result;
  } catch (error) {
    const err = {
      name: "Web3-get user NFT balance",
      error: error.message,
    };
    throw err;
  }
};

exports.NFTgetTotalMinted = async (contractIndex_) => {
  try {
    const result = await getNFTContract.NFTgetTotalMinted(contractIndex_);
    return result;
  } catch (error) {
    const err = {
      name: "Web3-get total minted",
      error: error.message,
    };
    throw err;
  }
};

exports.NFTgetTokenURI = async (tokenID_, collectionIndex_) => {
  try {
    const result = await getNFTContract.getTokenURI(tokenID_, collectionIndex_);
    return result;
  } catch (error) {
    const err = {
      name: "Web3-get NFT metadata URI",
      error: error.message,
    };
    throw err;
  }
};

exports.NFTgetApproved = async (tokenID_, contractIndex_) => {
  try {
    const result = await getNFTContract.NFTgetApproved_(tokenID_, contractIndex_);
    return result;
  } catch (error) {
    const err = {
      name: "Web3-get get approved address",
      error: error.message,
    };
    throw err;
  }
};

exports.NFTisApprovedForAll = async (owner_, operator_, contractIndex_) => {
  try {
    const result = await getNFTContract.NFTisApprovedForAll_(owner_, operator_, contractIndex_);
    return result;
  } catch (error) {
    const err = {
      name: "Web3-get get all approved NFT",
      error: error.message,
    };
    throw err;
  }
};

exports.getCollectionAddressByIndex = async (contractIndex_) => {
  try {
    const result = await getNFTContract.getCollectionAddressByIndex_(contractIndex_);
    return result;
  } catch (error) {
    const err = {
      name: "Web3-get NFT collection address by its index in the collection array",
      error: error.message,
    };
    throw err;
  }
};

exports.getCollectionNameByIndex = async (contractIndex_) => {
  try {
    const result = await getNFTContract.getCollectionNameByIndex_(contractIndex_);
    return result;
  } catch (error) {
    const err = {
      name: "Web3-get NFT collection name by its index in the collection array",
      error: error.message,
    };
    throw err;
  }
};

// escrow getter functions

exports.getTokenBalance = async (escrowContractAddress) => {
  try {
    const result = await getEscrowContract(escrowContractAddress).getTokenBalance();
    return result;
  } catch (error) {
    const err = {
      name: "Web3-get escrow fund balance",
      error: error.message,
    };
    throw err;
  }
};

exports.getCampaignStatus = async (escrowContractAddress) => {
  try {
    const result = await getEscrowContract(escrowContractAddress).getCampaignStatus();
    return result;
  } catch (error) {
    const err = {
      name: "Web3-get escrow get campaign status",
      error: error.message,
    };
    throw err;
  }
};

exports.WithdrawalApprovalStatus = async (escrowContractAddress, funderAddress) => {
  try {
    const result = await getEscrowContract(escrowContractAddress).WithdrawalApprovalStatus(funderAddress);
    return result;
  } catch (error) {
    const err = {
      name: "Web3-get escrow get the withdrawal approval status of a funder",
      error: error.message,
    };
    throw err;
  }
};

exports.funderAvailable = async (escrowContractAddress, funderAddress) => {
  try {
    const result = await getEscrowContract(escrowContractAddress).funderAvailable(funderAddress);
    return result;
  } catch (error) {
    const err = {
      name: "Web3-get escrow get the status of a funder",
      error: error.message,
    };
    throw err;
  }
};

exports.getFundAvailability = async (escrowContractAddress, funderAddress) => {
  try {
    const result = await getEscrowContract(escrowContractAddress).getFundAvailability(funderAddress);
    return result;
  } catch (error) {
    const err = {
      name: "Web3-get escrow get the fund availability status of a funder",
      error: error.message,
    };
    throw err;
  }
};

exports.getFundAmount = async (escrowContractAddress, funderAddress) => {
  try {
    const result = await getEscrowContract(escrowContractAddress).getFundAmount(funderAddress);
    return result;
  } catch (error) {
    const err = {
      name: "Web3-get escrow get the amount funded by a funder",
      error: error.message,
    };
    throw err;
  }
};


