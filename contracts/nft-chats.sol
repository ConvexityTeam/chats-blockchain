// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (token/ERC721/ERC721.sol)

pragma solidity ^0.8.0;
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

contract chatsNFT is Initializable, ERC721URIStorageUpgradeable, ReentrancyGuardUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIds;
    uint256 public totalMinted = 0;
    uint256 public NFTLimit;
    address public contractOwner;

 /// @custom:oz-upgrades-unsafe-allow constructor
    constructor () {
        contractOwner = msg.sender;
        _disableInitializers();
    }

     modifier onlyOwner() {
        require(msg.sender == contractOwner, "Only the contract owner can call this function");
        _;
    }

    function getTokenURI (uint256 tokenID) external view returns(string memory){
        string memory tokenURI = tokenURI(tokenID);
        return tokenURI;
    }

    function initialize(string memory _name, string memory _symbol) initializer external returns (bool) {
        __ERC721_init(_name, _symbol);
        __ERC721URIStorage_init();
        return true;
    }

      function getName () external view returns (string memory){
        string memory name = name();
        return name;
     }
     function getSymbol () external view returns (string memory){
        string memory symbol = symbol();
        return symbol;
     }

     function getOwner(uint256 _tokenId) external view returns (address){
         address owner = ownerOf(_tokenId);
         return owner;
     }

     function getBalance(address _owner) external view returns (uint256){
         uint256 balance = balanceOf(_owner);
         return balance;
     }

function setNFTLimit (uint256 _limit) external virtual onlyOwner returns (bool) {
    NFTLimit = _limit;
    return true;
}

function mintNFT(address recipient, string[] memory tokenURI) external nonReentrant onlyOwner returns (bool) {
    uint256 limit = tokenURI.length + totalMinted;
    require(limit <= NFTLimit, "NFT Limit reached, reduce number to be minted");
    uint256 localTotalMinted = totalMinted; // Use a local variable to hold the computation result
    for (uint256 i = 0; i < tokenURI.length; i++) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI[i]);
        localTotalMinted = localTotalMinted + 1; // Update the local variable
    }
    totalMinted = localTotalMinted; // Update the storage variable outside the loop
    return true;
}

    function burnNFT (uint256[] memory _NFTtokenId) external onlyOwner returns (bool){
         for (uint256 i = 0; i < _NFTtokenId.length; i++) { //start the index at 0
      _burn(_NFTtokenId[i]);
         }
        return true;
    }

function safeTransferFrom_(address from, address to, uint256 tokenId) external nonReentrant returns (bool){
    safeTransferFrom(from, to, tokenId);
    return true;
}

function transferFrom_(address from, address to, uint256 tokenId) external nonReentrant returns (bool) {
   transferFrom(from, to, tokenId);
   return true;
}

function approve_(address to, uint256 tokenId) external returns (bool) {
    approve(to, tokenId);
    return true;
}

function getApproved_(uint256 tokenId) external view returns (bool) {
    getApproved(tokenId);
    return true;
}

function setApprovalForAll_(address operator, bool _approved) external returns (bool) {
    setApprovalForAll(operator, _approved);
    return true;
}

function isApprovedForAll_(address owner, address operator) external view returns (bool) {
    isApprovedForAll(owner, operator);
    return true;
}

function safeTransferFrom_(address from, address to, uint256 tokenId, bytes memory data) external returns (bool) {
    safeTransferFrom(from, to, tokenId, data);
    return true;
}

function getTotalMinted() external view returns(uint256){
    return totalMinted;
}


}