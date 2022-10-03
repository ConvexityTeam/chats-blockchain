const {getTokenContract, getOpsContract} = require("../resources/web3config.js");
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
    let result = await getTokenContract.name();
    return result;
  } catch (error) {
    let err = {
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
    let result = await getTokenContract.owner();
    return result;
  } catch (error) {
    let err = {
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
    let result = await getTokenContract.isOwner(_address);
    return result;
  } catch (error) {
    let err = {
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
    let result = await connect.contract.methods.paused().call();
    return result;
  } catch (error) {
    let err = {
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
    let value = await connect.contract.methods.totalSupply().call();
    const result =web3.utils.fromWei(value, "kwei");
    return result;
  } catch (error) {
    let err = {
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
    let value = await connect.contract.methods.totalIssued().call({ from: _From });
    const result =web3.utils.fromWei(value, "kwei");
    return result;
  } catch (error) {
    let err = {
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
    let value = await connect.contract.methods.totalRedeemed().call({ from: _From });
    const result = ethers.utils.formatEther(value, "kwei");
    return result;
  } catch (error) {
    let err = {
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
    let value = await getTokenContract.allowance(_tokenOwner, _spender);
    const result = ethers.utils.formatUnits(value, "mwei");
    return ethers.utils.commify(result);
  } catch (error) {
    let err = {
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
    
    let value = await getTokenContract.balanceOf(_account);
    const result = ethers.utils.formatUnits(value, "mwei");
    return ethers.utils.commify(result);
  } catch (error) {
    let err = {
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
exports.getUsersList = async (_From) => {
  try {
    let result = await connect.contract.methods.GetUsersList().call({ from: _From });
    return result;
  } catch (error) {
    let err = {
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
exports.getAdminList = async (_From) => {
  try {
    let result = await connect.contract.methods.GetAdminList().call({ from: _From });
    return result;
  } catch (error) {
    let err = {
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
exports.getAuthorizerList = async (_From) => {
  try {
    let result = await connect.contract.methods.GetAuthorizerList().call({ from: _From });
    return result;
  } catch (error) {
    let err = {
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
exports.getBlackListed = async (_From) => {
  try {
    let result = await connect.contract.methods.GetBlackListed().call({ from: _From });
    return result;
  } catch (error) {
    let err = {
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
    let result = await connect.contract.methods.isUserListed(_account).call();
    return result;
  } catch (error) {
    let err = {
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
    let result = await connect.contract.methods.isAdmin(_account).call();
    return result;
  } catch (error) {
    let err = {
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
    let result = await connect.contract.methods.isAuthorizer(_account).call();
    return result;
  } catch (error) {
    let err = {
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
    let result = await connect.contract.methods.isBlackListed(_account).call();
    return result;
  } catch (error) {
    let err = {
      name: "Web3-isBlackListed",
      error: error.message,
    };
    throw err;
  }
};
