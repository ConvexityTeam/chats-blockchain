// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (token/ERC721/ERC721.sol)

pragma solidity ^0.8.0;
import "./nft-chats.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract chatsFactory is OwnableUpgradeable {
    chatsNFT[] public collections; //an array that contains different ERC1155 tokens deployed
    mapping(uint256 => address) public indexToContract; //index to contract address mapping
    mapping(uint256 => string) public indexToContractName;
    event ERC721Created(uint256 index, address tokenContract); //emitted when ERC1155 token is deployed
    
    // Deploy an instance of CHATS NFT collection
    function deployCollection(string memory _contractName ) external onlyOwner returns (address) {
        chatsNFT t = new chatsNFT();
        collections.push(t);
        indexToContract[collections.length - 1] = address(t);
        indexToContractName[collections.length - 1] = _contractName;        
        emit ERC721Created(collections.length-1,address(t));
        return address(t);
    }

    // get CHATS NFT collection address by index
    function getCollectionAddressByIndex (uint256 _index) external view returns (address){
        address collectionAddress = indexToContract[_index];
        return collectionAddress;
    }

    // get CHATS NFT collection name by index
     function getCollectionNameByIndex (uint256 _index) external view returns (string memory){
        string memory collectionName = indexToContractName[_index];
        return collectionName;
    }

}