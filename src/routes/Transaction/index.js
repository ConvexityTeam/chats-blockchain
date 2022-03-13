
const router = require('express').Router();
const VerifyChecksum = require('../../middleware/verifyChecksum');
const { TransferAdmin, Transfers, Minting, Redeeming, Approve, TransferFrom, DestroyBlackFunds } = require('./txn.controller');

router.post('/transferadmin/:receiver/:amount', TransferAdmin);
router.post('/transfer/:senderaddr/:senderpwsd/:receiver/:amount', Transfers);
router.post('/mint/:amount/:mintTo', VerifyChecksum, Minting);
router.post('/redeem/:senderaddr/:senderpswd/:amount', Redeeming);
router.post('/distroyblackfund/:useraddr', DestroyBlackFunds);
router.post('/approve/:tokenowneraddr/:tokenownerpswd/:spenderaddr/:amount', Approve);
router.post('/transferfrom/:tokenowneraddr/:to/:spenderaddr/:spenderpwsd/:amount', TransferFrom);

module.exports = router;
