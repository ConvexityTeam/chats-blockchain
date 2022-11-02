const router = require('express').Router();
const {
  GetName,
  GetSuperAdminAcc,
  GetUsersList,
  GetAdminList,
  GetAuthorizersList,
  GetBlackList,
  GetTotalSupply,
  GetTotalIssued,
  GetTotalRedeemed,
  GetBalance,
  GetAllowance,

  NFTapproved,
  NFTbalance,
  NFTname,
  NFTsymbol,
  NFTowner,
  NFTtokenURI,
  NFTtotalMinted,
  NFTisApprovedForAll,
  getCollectionAddress,
  getCollectionName
} = require('./account.controller')

router.get('/ping/', GetName);
router.get('/superadmin', GetSuperAdminAcc);
router.get('/userlist/:address', GetUsersList);
router.get('/adminlist/:address', GetAdminList);
router.get('/authlist/:address', GetAuthorizersList);
router.get('/blacklist/:address', GetBlackList);
router.get('/totalsupply', GetTotalSupply);
router.get('/issuedamt/:address', GetTotalIssued);
router.get('/redeemamt/:address', GetTotalRedeemed);
router.get('/balance/:address', GetBalance);
router.get('/allowance/:tokenOwner/:spenderAddr', GetAllowance);

// NFT routes
router.get('/approve/:collectionIndex/:tokenId',NFTapproved)
router.get('/nft-balance/:collectionIndex/:address',NFTbalance)
router.get('/approvalforall/:collectionIndex/:owner/:operator',NFTisApprovedForAll)
router.get('/nft-name/:collectionIndex',NFTname)
router.get('/nft-symbol/:collectionIndex',NFTsymbol)
router.get('/nft-owner/:collectionIndex/:tokenId',NFTowner)
router.get('/token-uri/:collectionIndex/:tokenId',NFTtokenURI)
router.get('/total-nft-minted/:collectionIndex',NFTtotalMinted)
router.get('/collection-name/:collectionIndex',getCollectionName)
router.get('/collection-address/:collectionIndex',getCollectionAddress)

module.exports = router;