const router = require('express').Router();
const {
    TransferAdmin,
    Transfers,
    Minting,
    Redeeming,
    Approve,
    TransferFrom,
    DestroyBlackFunds
} = require('./txn.controller')

router.post('/transferadmin/:receiver/:amount', TransferAdmin);
router.post('/transfer/:senderaddr/:senderpwsd/:receiver/:amount', Transfers);
router.post('/mint/:amount/:mintTo', Minting);
router.post('/redeem/:amount', Redeeming);
router.post('/distroyblackfund/:useraddr', DestroyBlackFunds);

// router.post('/approve/:tokenowneraddr/:tokenownerpswd/:spenderaddr/:amount', Approve);
// router.post('/transferfrom/:tokenoweraddr/:spenderaddr/:spenderpwsd/:amount', TransferFrom);

module.exports = router;
