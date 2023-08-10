const trnx = require("../../connectWeb3/index");

const adminSignatory = async (req, res) => {
    const withdrawer = req.params.withdrawer;
    const escrowContractAddress = req.params.escrowContractAddress
    try {
        const adminApprove = await trnx.adminSignatory(escrowContractAddress, withdrawer)
        return res.status(200).json({adminApprove})
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}

const endCampaign = async (req, res) => {
    const escrowContractAddress = req.params.escrowContractAddress
    try {
        const endCampaign = await trnx.endCampaign(escrowContractAddress)
        return res.status(200).json({endCampaign})
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}

const resumeCampaign = async (req, res) => {
    const escrowContractAddress = req.params.escrowContractAddress
    try {
        const resumeCampaign = await trnx.resumeCampaign(escrowContractAddress)
        return res.status(200).json({resumeCampaign})
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}

const updateDefaultStableCoin = async (req, res) => {
    const defaultStableCoin = req.params.defaultStableCoin;
    const escrowContractAddress = req.params.escrowContractAddress
    try {
        const updateDefaultStableCoin = await trnx.updateDefaultStableCoin(escrowContractAddress, defaultStableCoin)
        return res.status(200).json({updateDefaultStableCoin})
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}

const updateErc20Token = async (req, res) => {
    const tokenAddress = req.params.tokenAddress;
    const symbol = req.params.symbol
    const escrowContractAddress = req.params.escrowContractAddress
    try {
        const updateErc20Token = await trnx.updateErc20Token(escrowContractAddress, tokenAddress, symbol)
        return res.status(200).json({updateErc20Token})
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}

const getFundAmount = async (req, res) => {
    const funderAddress = req.params.funderAddress;
    const escrowContractAddress = req.params.escrowContractAddress
    try {
        const getFundAmount = await trnx.getFundAmount(escrowContractAddress, funderAddress)
        return res.status(200).json({getFundAmount})
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}

const getFundAvailability = async (req, res) => {
    const funderAddress = req.params.funderAddress;
    const escrowContractAddress = req.params.escrowContractAddress
    try {
        const getFundAvailability = await trnx.getFundAvailability(escrowContractAddress, funderAddress)
        return res.status(200).json({getFundAvailability})
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}

const funderAvailable = async (req, res) => {
    const funderAddress = req.params.funderAddress;
    const escrowContractAddress = req.params.escrowContractAddress
    try {
        const funderAvailable = await trnx.funderAvailable(escrowContractAddress, funderAddress)
        return res.status(200).json({funderAvailable})
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}

const WithdrawalApprovalStatus = async (req, res) => {
    const funderAddress = req.params.funderAddress;
    const escrowContractAddress = req.params.escrowContractAddress
    try {
        const WithdrawalApprovalStatus = await trnx.WithdrawalApprovalStatus(escrowContractAddress, funderAddress)
        return res.status(200).json({WithdrawalApprovalStatus})
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}

const getCampaignStatus = async (req, res) => {
    const escrowContractAddress = req.params.escrowContractAddress
    try {
        const getCampaignStatus = await trnx.getCampaignStatus(escrowContractAddress)
        return res.status(200).json({getCampaignStatus})
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}

const getTokenBalance = async (req, res) => {
    const escrowContractAddress = req.params.escrowContractAddress
    try {
        const getTokenBalance = await trnx.getTokenBalance(escrowContractAddress)
        return res.status(200).json({getTokenBalance})
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}

const deployEscrow = async (req, res) => {
    const uniswapRouterAddress =  req.params.uniswapRouterAddress;
    const wmaticContractAddress = req.params.wmaticContractAddress;
    const quickSwapRouter = req.params.quickSwapRouter;
    const campaignName = req.params.campaignName
    const escrowContractAddress = req.params.escrowContractAddress
    try {
        const deployEscrow = await trnx.deployEscrow(escrowContractAddress, uniswapRouterAddress, wmaticContractAddress,quickSwapRouter, campaignName)
        return res.status(200).json({deployEscrow})
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}

const adminWithdrawFunds = async (req, res) => {
    const amount = req.params.amount;
    const offRampAddress = req.params.offRampAddress;
    const escrowContractAddress = req.params.escrowContractAddress
    try {
        const adminWithdrawFunds = await trnx.adminWithdrawFunds(escrowContractAddress, amount, offRampAddress)
        return res.status(200).json({adminWithdrawFunds})
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}



module.exports = {
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
}






