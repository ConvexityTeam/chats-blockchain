
const router = require('express').Router();
const VerifyChecksum = require('../../middleware/verifyChecksum');
const { TransferAdmin, Transfers, Minting, Redeeming, Approve, Disapprove, TransferFrom, DestroyBlackFunds } = require('./txn.controller');

router.post('/transferadmin/:receiver/:amount', TransferAdmin);
router.post('/transfer/:senderpwsd/:receiver/:amount', Transfers);
router.post('/mint/:amount/:mintTo', /*VerifyChecksum,*/ Minting);
router.post('/redeem/:senderpswd/:amount', Redeeming);
router.post('/distroyblackfund/:useraddr', DestroyBlackFunds);
router.post('/approve/:tokenownerpswd/:spenderaddr/:amount', Approve);
router.post('/disapprove/:tokenownerpswd/:spenderaddr/:amount', Disapprove);
router.post('/transferfrom/:tokenowneraddr/:spenderpwsd/:amount', TransferFrom);

module.exports = router;
