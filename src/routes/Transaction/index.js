
const router = require('express').Router();
const VerifyChecksum = require('../../middleware/verifyChecksum');
const { TransferAdmin, Transfers, Minting, Redeeming, Approve, Disapprove, TransferFrom, DestroyBlackFunds,
    mintNFT,
    burnNFT,
    NFTtransferFrom,
    NFTsafeTransferFrom,
    NFTapprove,
    NFTsetApprovalForAll } = require('./txn.controller');

router.post('/transferadmin/:receiver/:amount', TransferAdmin);
router.post('/transfer/:senderpwsd/:receiver/:amount', Transfers);
router.post('/mint/:amount/:mintTo', /*VerifyChecksum,*/ Minting);
router.post('/redeem/:senderpswd/:amount', Redeeming);
router.post('/distroyblackfund/:useraddr', DestroyBlackFunds);
router.post('/approve/:tokenownerpswd/:spenderaddr/:amount', Approve);
router.post('/disapprove/:tokenownerpswd/:spenderaddr/:amount', Disapprove);
router.post('/transferfrom/:tokenowneraddr/:receiveraddr/:spenderpwsd/:amount', TransferFrom);

// nft routes
router.post('/mint-nft/:receiver/:contractIndex', mintNFT)
router.post('/burn-nft/:contractIndex', burnNFT)
router.post('/approve-nft/:operator/:tokenId/:contractIndex', NFTapprove)
router.post('/transfer-nft/:sender/:receiver/:tokenId/:contractIndex', NFTtransferFrom)
router.post('/safe-transfer-nft/:sender/:receiver/:tokenId/:contractIndex',NFTsafeTransferFrom)
router.post('/setapproval-forall-nft/:operator/:approvalStatus/:contractIndex',NFTsetApprovalForAll)
module.exports = router;
