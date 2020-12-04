const accountRouters = require('./Account');
const txnRouters = require('./Transaction');
const usermgtRouters = require('./UserMgt');

const express = require('express');
const { Router } = express;
const router = Router();

// Blockchain File Management
router.use('/web3/account', accountRouters)
router.use('/web3/user', usermgtRouters)
router.use('/web3/txn', txnRouters)

module.exports = router;
