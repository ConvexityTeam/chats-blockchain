// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.4;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IuniswapRouter {
    struct ExactInputSingleParams {
        address tokenIn;
        address tokenOut;
        uint24 fee;
        address recipient;
        uint256 deadline;
        uint256 amountIn;
        uint256 amountOutMinimum;
        uint160 sqrtPriceLimitX96;
    }

    /// @notice Swaps `amountIn` of one token for as much as possible of another token
    /// @param params The parameters necessary for the swap, encoded as `ExactInputSingleParams` in calldata
    /// @return amountOut The amount of the received token
    function exactInputSingle(ExactInputSingleParams calldata params)
        external
        payable
        returns (uint256 amountOut);
}

interface IquickswapRouter {
    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);
}

interface IWMATIC {
    function deposit() external payable;
    function transfer(address to, uint value) external returns (bool);
    function withdraw(uint) external;
    function balanceOf(address) external returns(uint);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract chatsEscrow  is Ownable {
    IuniswapRouter uniswapRouter;
    IWMATIC wmatic;
    IquickswapRouter quickswapRouter;
    
    address immutable uniswapRouterAddress;
    address immutable wmaticContractAddress;
    address immutable quickswapRouterAddress;

    mapping (address => uint256) public funder;
    mapping (address => bool)public fundAvailability;
    mapping (address => bool) public isFunder;
    mapping (address => bool) public withdrawalApproval;

    mapping (string => address) public  erc20Tokens;
    uint256 public erc20TokenCount;
// 0xE592427A0AEce92De3Edee1F18E0157C05861564 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270 0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff "rrice"
    bool campaignStatus = true;

    string campaignName;
    address public defaultStableCoin;

    event efundCampaignMatic(uint256 indexed maticValue, uint256 indexed usdValue);
    event efundCampaignErc20Token(uint256 indexed erc20TokenValue, uint256 indexed usdValue);
    event efundCampaignStableCoin(uint256 indexed usdValue);
    ///@custom:oz-upgrades-unsafe-allow constructor
    constructor (
        address _uniswapRouterAddress,
        address _wmaticContractAddress,
        address _quickswapRouter,
        string memory _campaignName
    ){
        require(_uniswapRouterAddress != address(0));
        require(_wmaticContractAddress != address(0));
        require(_quickswapRouter != address(0));
        uniswapRouterAddress = _uniswapRouterAddress;
        uniswapRouter = IuniswapRouter(_uniswapRouterAddress);
        wmatic = IWMATIC(_wmaticContractAddress);
        wmaticContractAddress = _wmaticContractAddress;
        campaignName = _campaignName;
        quickswapRouter = IquickswapRouter(_quickswapRouter);
        quickswapRouterAddress = _quickswapRouter;
    }

    modifier activeCampaign {
        require (campaignStatus, "Campaign is no longer active or has been suspended");
        _;
    }

    function adminSignatory (address withdrawer) public virtual onlyOwner returns (bool) {
        withdrawalApproval[withdrawer] = true;
        return true;
    }

    function endCampaign() public virtual onlyOwner returns(bool) {
        campaignStatus =false;
        return true;
    }

    function resumeCampaign () public virtual onlyOwner returns(bool) {
        campaignStatus = true;
        return true;
    }

    function updateDefaultStableCoin (address _defaultStableCoinAddress) public virtual onlyOwner returns (bool){
        defaultStableCoin = _defaultStableCoinAddress;
        return true;
    }

        function updateErc20Token (address _tokenAddress, string calldata _symbol) public virtual onlyOwner returns (bool){
        erc20Tokens[_symbol] = _tokenAddress;
        erc20TokenCount = erc20TokenCount + 1;
        return true;
    }


    function fundCampaignStableCoin (string calldata coinSymbol, uint256  _amount) public virtual activeCampaign returns (bool) {
        require (_amount > 0, "You cannot transfer zero amount");
        address coinAddress = defaultStableCoin;
        IERC20Metadata stableCoin =  IERC20Metadata(coinAddress);
        bool success = stableCoin.transferFrom(msg.sender, address(this),_amount);
        require(success, "Transfer not successful");
        funder[msg.sender] = _amount + funder[msg.sender];
        fundAvailability[msg.sender] =  true;
        isFunder[msg.sender] = true;
        withdrawalApproval[msg.sender] = false;
        emit efundCampaignStableCoin(_amount);
        return true;
    }

    function fundCampaignMatic () public payable virtual activeCampaign returns (bool) {
        uint256 amount = msg.value;
        require (amount > 0, "You cannot transfer zero amount");
       // uint256 wrappedMATIC = wmatic.deposit{value:amount}();
        address stableCoinAddress = defaultStableCoin;
        IuniswapRouter.ExactInputSingleParams memory params = IuniswapRouter
            .ExactInputSingleParams({
                tokenIn: wmaticContractAddress,
                tokenOut: stableCoinAddress,
                fee: 3000,
                recipient: address(this),
                deadline: block.timestamp + 300,
                amountIn: amount,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });
        //wmatic.approve(uniswapRouterAddress, wrappedMATIC);
        uint256 swappedUSDT = uniswapRouter.exactInputSingle{value:amount}(params);
        funder[msg.sender] = swappedUSDT + funder[msg.sender];
        fundAvailability[msg.sender] =  true;
        isFunder[msg.sender] = true;
        withdrawalApproval[msg.sender] = false;
        emit efundCampaignMatic(amount, swappedUSDT);
        return true;
    }

        function fundCampaignErc20Token (string calldata coinSymbol, uint256  _amount) public virtual activeCampaign returns (bool) {
        require (_amount > 0, "You cannot transfer zero amount");
        address erc20TokenAddress = erc20Tokens[coinSymbol];
        address stableCoinAddress = defaultStableCoin;
        IERC20Metadata erc20Token =  IERC20Metadata(erc20TokenAddress);
        bool success = erc20Token.transferFrom(msg.sender, address(this),_amount);
        require(success, "Transfer not successful");
        uint256 deadline = block.timestamp +300;
        address[] memory path1 = new address[](2);
        path1[0] = erc20TokenAddress;
        path1[1] = stableCoinAddress;
        bool ApprovalSuccess = erc20Token.approve(quickswapRouterAddress, _amount);
        require(ApprovalSuccess, "Approval not successful");
        uint256[] memory swappedUSDC = quickswapRouter.swapExactTokensForTokens(
            _amount,
            0,
            path1,
            address(this),
            deadline
        );
        funder[msg.sender] = swappedUSDC[1] + funder[msg.sender];
        fundAvailability[msg.sender] =  true;
        isFunder[msg.sender] = true;
        withdrawalApproval[msg.sender] = false;
        emit efundCampaignErc20Token(_amount, swappedUSDC[1]);
        return true;
    }

    function adminWithdrawFunds (uint256 _amount, address _offRampAddress) public virtual onlyOwner returns(bool) {
        require (_amount > 0, "You cannot withdraw zero amount");
        address USD = defaultStableCoin;
        IERC20Metadata stableCoin = IERC20Metadata(USD);
        require(stableCoin.balanceOf(address(this)) > _amount, "Amount requested exceeds token balance");
        bool success = stableCoin.transfer(_offRampAddress, _amount);
        require(success, "Transfer not successful");
        return true;
    }

    function withdrawFunds (uint256 _amount) public virtual returns (bool) {
        require(withdrawalApproval[msg.sender], "You are not authorized to withdraw");
        require (_amount > 0, "You cannot withdraw zero amount");
        uint256 funderBalance = funder[msg.sender];
        require (funderBalance > 0, "You have no funds to withdraw");
        require (fundAvailability[msg.sender], "You have no funds to withdraw");
        require (_amount <= funderBalance, "Amount requested is more than your balance");
        funder[msg.sender] = funderBalance - _amount;
        uint256 remainingBalance = funder[msg.sender];
        address USD = defaultStableCoin;
        IERC20Metadata stableCoin = IERC20Metadata(USD);
        require(stableCoin.balanceOf(address(this)) > _amount, "Amount requested exceeds token balance");
        bool success = stableCoin.transfer(msg.sender, _amount);
        require(success, "Transfer not successful");
        if (remainingBalance == 0){
            fundAvailability[msg.sender] = false;
            withdrawalApproval[msg.sender] = false;
            return true;
        }
        else {
            withdrawalApproval[msg.sender] = false;
            return true;
        }
    }

    function getFundAmount (address _funder) public view returns (uint256) {
        return funder[_funder];
    }

    function getFundAvailability (address _funder) public view returns (bool) {
        return fundAvailability[_funder];
    }

    function funderAvailable (address _funder) public view returns (bool) {
        return isFunder[_funder];
    }

    function WithdrawalApprovalStatus (address _funder) public view returns (bool) {
        return withdrawalApproval[_funder];
    }

    function getCampaignStatus () public view returns (bool) {
        return campaignStatus;
    }

    function getTokenBalance () public view returns(uint256) {
        address USD = defaultStableCoin;
         IERC20Metadata stableCoin = IERC20Metadata(USD);
        return stableCoin.balanceOf(address(this));
    }

}