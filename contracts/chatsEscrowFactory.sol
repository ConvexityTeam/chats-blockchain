// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.4;
pragma abicoder v2;

import "./chatsEscrow.sol";

contract chatsEscrowFactory {
    address public owner;
    ///@custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        owner = msg.sender;
    }

    chatsEscrow[] public escrows; //an array that contains different ERC1155 tokens deployed
    mapping(uint256 => address) public indexToEscrow; //index to contract address mapping
    mapping(uint256 => string) public indexToEscrowName;
    event EscrowCreated(uint256 index, address escrowContract); //emitted when ERC1155 token is deployed

    // Deploy an instance of   NFT collection
    modifier onlyOwner {
        require (msg.sender == owner);
        _;
    }

    function deployEscrow
    (
        address _uniswapRouterAddress,
        address _wmaticContractAddress,
        address _quickswapRouter,
        string memory _campaignName
    ) external onlyOwner returns (address) {
        chatsEscrow t = new chatsEscrow(
        _uniswapRouterAddress,
        _wmaticContractAddress,
        _quickswapRouter,
        _campaignName
        );
        escrows.push(t);
        indexToEscrow[escrows.length - 1] = address(t);
        indexToEscrowName[escrows.length - 1] = _campaignName;        
        emit EscrowCreated(escrows.length-1,address(t));
        return address(t);
    }

}
