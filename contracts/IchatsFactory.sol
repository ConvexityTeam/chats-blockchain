// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (token/ERC721/ERC721.sol)

pragma solidity ^0.8.0;

interface IChatsFactory {
    function deployCollection(string memory _contractName) external returns (address);
    function getCollectionAddressByIndex(uint256 _index) external view returns (address);
    function getCollectionNameByIndex(uint256 _index) external view returns (string memory);
}
