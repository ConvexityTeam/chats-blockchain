
const router = require('express').Router();
const VerifyChecksum = require('../../middleware/verifyChecksum');
const { 
    TransferAdmin, 
    Transfers, 
    Minting, 
    Redeeming, 
    Approve, 
    Disapprove, 
    TransferFrom, 
    DestroyBlackFunds,
    mintNFT,
    burnNFT,
    NFTtransferFrom,
    setNFTlimit,
    deployCollection,
    NFTapprove,
    NFTsetApprovalForAll,
    SetParams } = require('./txn.controller');

router.post('/transferadmin/:receiver/:amount', TransferAdmin);
router.post('/transfer/:senderpwsd/:receiver/:amount', Transfers);
router.post('/mint/:amount/:mintTo', VerifyChecksum, Minting);
router.post('/redeem/:senderpswd/:amount', Redeeming);
router.post('/distroyblackfund/:useraddr', DestroyBlackFunds);
router.post('/approve/:tokenownerpswd/:spenderaddr/:amount', Approve);
router.post('/disapprove/:tokenownerpswd/:spenderaddr/:amount', Disapprove);
router.post('/transferfrom/:tokenowneraddr/:receiveraddr/:spenderpwsd/:amount', TransferFrom);
router.post('/setparams/:pointbase/:maxfee', SetParams);

// nft routes
router.post('/mint-nft/:receiver/:contractIndex/:tokenURI', mintNFT)
router.post('/burn-nft/:contractIndex/:tokenID', burnNFT)
router.post('/approve-nft/:operator/:tokenId/:contractIndex', NFTapprove)
router.post('/transfer-nft/:sender/:receiver/:tokenId/:contractIndex', NFTtransferFrom)
router.post('/setapproval-forall-nft/:operator/:approvalStatus/:contractIndex',NFTsetApprovalForAll)
router.post('/set-nft-limit/:limit/:contractIndex',setNFTlimit)
router.post('/deploy-collection/:contractName/:collectionName/:collectionSymbol', deployCollection)

module.exports = router;
