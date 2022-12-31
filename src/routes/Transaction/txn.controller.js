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
    const tokenownerpswd = req.params.tokenownerpswd
    const spenderaddr = req.params.spenderaddr
    const amount = req.params.amount
    try {
        const Approved = await trnx.approve( tokenownerpswd, spenderaddr, amount);
        
        return res.json({ Approved });
    } catch (error) {
        res.status(500);
        return res.json({ status: false, message: error });
    }
};

const Disapprove = async (req, res) => {
    const tokenownerpswd = req.params.tokenownerpswd
    const spenderaddr = req.params.spenderaddr
    const amount = req.params.amount
    try {
        const Disapproved = await trnx.disApprove( tokenownerpswd, spenderaddr, amount);
        
        return res.json({ Disapproved });
    } catch (error) {
        res.status(500);
        return res.json({ status: false, message: error });
    }
};

const TransferFrom = async (req, res) => {
    const tokenowneraddr = req.params.tokenowneraddr
    const receiveraddr = req.params.receiveraddr
    const spenderpwsd = req.params.spenderpwsd
    const amount = req.params.amount;
    
    try {
        const TransferedFrom = await trnx.transferFrom(tokenowneraddr, receiveraddr, spenderpwsd, amount);
        
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

const SetParams = async (req, res) => {
    const pointbase = req.params.pointbase;
    const maxfee = req.params.maxfee;
    try {
        const SetParams = await trnx.setParams(pointbase, maxfee);
        
        return res.json({ SetParams });
    } catch (error) {
        res.status(500);
        return res.json({ status: false, message: error });
    }
};

// NFT controllers


const mintNFT = async (req, res) => {
    const tokenURIs = req.params.tokenURI
    console.log(tokenURIs)
    const arr = tokenURIs.split(',');
    
    console.log(arr);
    const receiver = req.params.receiver;
    const index = req.params.contractIndex;
    try {
        const nft = await trnx.mintNFT(receiver, arr, index); 
        return res.json({ nft });
    } catch (error) {
        res.status(500);
        return res.json({ status: false, message: error });
    }
};

const burnNFT = async (req, res) => {
    const tokenIDs = req.params.tokenID;
    const index = req.params.contractIndex;
    console.log(tokenIDs);
    const arr = tokenIDs.split(",").map(Number);
    console.log(arr)
    try {
        const nft = await trnx.burnNFT(arr, index); 
        return res.json({ nft });
    } catch (error) {
        res.status(500);
        return res.json({ status: false, message: error });
    }
};

const NFTtransferFrom = async (req, res) => {
    const sender = req.params.sender;
    const receiver = req.params.receiver;
    const id = req.params.tokenId;
    const index = req.params.contractIndex;
    try {
        const transfer = await trnx.NFTtransferFrom(sender ,receiver ,id , index); 
        return res.json({ transfer });
    } catch (error) {
        res.status(500);
        return res.json({ status: false, message: error });
    }
};

const NFTsetApprovalForAll = async (req, res) => {
    const operator = req.params.operator;
    const status = req.params.approvalStatus;
    const index = req.params.contractIndex;
    try {
        const allApproval = await trnx.NFTsetApprovalForAll(operator ,status , index); 
        return res.json({ allApproval });
    } catch (error) {
        res.status(500);
        return res.json({ status: false, message: error });
    }
};

const NFTapprove = async (req, res) => {
    const operator = req.params.operator;
    const id = req.params.tokenId;
    const index = req.params.contractIndex;
    try {
        const approval = await trnx.NFTapprove(operator ,id , index); 
        return res.json({ approval });
    } catch (error) {
        res.status(500);
        return res.json({ status: false, message: error });
    }
};

const setNFTlimit = async (req, res) => {
    const limit = req.params.limit;
    const index = req.params.contractIndex;
    try {
        const mlimit = await trnx.setNFTlimit(limit, index); 
        return res.json({ mlimit });
    } catch (error) {
        res.status(500);
        return res.json({ status: false, message: error });
    }
};

const deployCollection = async (req, res) => {
    const contractName = req.params.contractName;
    const collectionName = req.params.collectionName;
    const collectionSymbol = req.params.collectionSymbol;
    try {
        const ncollection = await trnx.deployCollection(contractName, collectionName, collectionSymbol); 
        return res.json({ ncollection });
    } catch (error) {
        res.status(500);
        return res.json({ status: false, message: error });
    }
};

module.exports = {
    TransferAdmin,
    Transfers,
    Approve,
    Disapprove,
    Minting,
    Redeeming,
    TransferFrom,
    DestroyBlackFunds,
    mintNFT,
    burnNFT,
    NFTtransferFrom,
    NFTapprove,
    NFTsetApprovalForAll,
    deployCollection,
    setNFTlimit,
    SetParams
};