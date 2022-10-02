const trnx = require("../../connectWeb3/index");

const TransferAdmin = async (req, res) => {
        const receiver = req.params.receiver
        const amount = req.params.amount
    try {
        const TransferByAdmin = await trnx.transferAdmin(receiver, amount);
        return res.json({ TransferByAdmin });
    } catch (error) {
        res.status(500);
        return res.json({ status: false, message: error });
    }
};

const Transfers = async (req, res) => {
    const senderpwsd = req.params.senderpwsd;
    const receiver = req.params.receiver
    const amount = req.params.amount
    try {
        const Transfered = await trnx.transfers(senderpwsd, receiver, amount);
        
        return res.json({ Transfered });
    } catch (error) {
        res.status(500);
        return res.json({ status: false, message: error });
    }
};

const Minting = async (req, res) => {
    const amount = req.params.amount
    const mintTo = req.params.mintTo
    try {
        const Minted = await trnx.minting(amount, mintTo);
        
        return res.json({ Minted });
    } catch (error) {
        console.log(error);
        res.status(500);
        return res.json({ status: false, message: error });
    }
};

const Redeeming = async (req, res) => {
    const senderpswd = req.params.senderpswd
    const amount = req.params.amount
    try {
        const Redeemed = await trnx.redeeming(senderpswd, amount);
        
        return res.json({ Redeemed });
    } catch (error) {
        res.status(500);
        return res.json({ status: false, message: error });
    }
};

const Approve = async (req, res) => {
    const tokenowneraddr = req.params.tokenowneraddr
    const tokenownerpswd = req.params.tokenownerpswd
    const spenderaddr = req.params.spenderaddr
    const amount = req.params.amount
    try {
        const Approved = await trnx.approve(tokenowneraddr, tokenownerpswd, spenderaddr, amount);
        
        return res.json({ Approved });
    } catch (error) {
        res.status(500);
        return res.json({ status: false, message: error });
    }
};

const TransferFrom = async (req, res) => {
    const tokenowneraddr = req.params.tokenowneraddr
    const to = req.params.to
    const spenderaddr = req.params.spenderaddr
    const spenderpwsd = req.params.spenderpwsd
    const amount = req.params.amount;
    
    try {
        const TransferedFrom = await trnx.transferFrom(tokenowneraddr, to, spenderaddr, spenderpwsd, amount);
        
        return res.json({ TransferedFrom });
    } catch (error) {
        res.status(500);
        return res.json({ status: false, message: error });
    }
};

const DestroyBlackFunds = async (req, res) => {
    const useraddr = req.params.useraddr;
    try {
        const DestroyedFunds = await trnx.destroyBlackFunds(useraddr);
        
        return res.json({ DestroyedFunds });
    } catch (error) {
        res.status(500);
        return res.json({ status: false, message: error });
    }
};

module.exports = {
    TransferAdmin,
    Transfers,
    Approve,
    Minting,
    Redeeming,
    TransferFrom,
    DestroyBlackFunds
};