const router = require('express').Router()
const {
    deployEscrow,
    endCampaign,
    resumeCampaign,
    getFundAmount,
    getFundAvailability,
    getCampaignStatus,
    adminSignatory,
    getTokenBalance,
    updateDefaultStableCoin,
    updateErc20Token,
    funderAvailable,
    WithdrawalApprovalStatus,
    adminWithdrawFunds
} = require("./escrow.controller")

router.post('/deploy-escrow/:uniswapRouterAddress/:wmaticContractAddress/:quickSwapRouter/:campaignName', deployEscrow)
router.post('/end-campaign/:escrowContractAddress', endCampaign)
router.post('/resume-campaign/:escrowContractAddress', resumeCampaign)
router.post('/admin-signature/:escrowContractAddress/:withdrawer',adminSignatory)
router.post('/admin-withdraw-funds/:escrowContractAddress/:amount/:offRampAddress', adminWithdrawFunds)
router.post('/update-default-stablecoin/:escrowContractAddress/:defaultStableCoin', updateDefaultStableCoin)
router.post('/update-erc20-token/:escrowContractAddress/:tokenAddress/:symbol', updateErc20Token)
router.get('/get-fund-amount/:escrowContractAddress/:funderAddress', getFundAmount)
router.get('/get-fund-availability/:escrowContractAddress/:funderAddress', getFundAvailability)
router.get('/withdrawal-approval-status/:escrowContractAddress/:funderAddress', WithdrawalApprovalStatus)
router.get('/funder-available/:escrowContractAddress/:funderAddress', funderAvailable)
router.get('/campaign-status/:escrowContractAddress', getCampaignStatus)
router.get('/get-token-balance/:escrowContractAddress', getTokenBalance)

module.exports = router;
