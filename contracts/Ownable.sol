pragma solidity ^0.5.0;

// import "@openzeppelin/upgrades/contracts/Initializable.sol";

import "./Libs/Context.sol";

/**
 * @title Owned
 *
 * @dev Owned contract - Implements a simple ownership model with 2-phase transfer
 * functions to let the owner sets transfer the ownership control. It can transfer
 * the ownership to a new owner through making a proposedOwner.
 */
contract Ownable is Context {
    address public owner;

    /**
     * @dev The Owned constructor sets the original `owner` of the contract to the
     * creator's account.
     */
    constructor() public {
        owner = _msgSender();
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(isOwner(_msgSender()) == true);
        _;
    }

    /**
     * @dev returns trure is address is the contract Owner.
     *
     * @param _address - The address of the conntract Owner.
     */
    function isOwner(address _address) public view returns (bool) {
        return (_address == owner);
    }
}
