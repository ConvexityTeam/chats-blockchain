pragma solidity ^0.5.0;

// import "@openzeppelin/upgrades/contracts/Initializable.sol";

import "./ERC20Token.sol";

/**
 * @dev Contract module for Tranfering the Contract ownership.
 *
 * This module is used to transfer the Ownership of the Contract
 * to a new Owner who is not BlackListed but is an Admin.
 */
contract ContractOwnershipTransfer is ERC20Token {
    address public proposedOwner;
    address internal pastOwner;
    uint256 internal pastOwnerbalance;

    event OwnershipTransferInitiated(address indexed _proposedOwner);
    event OwnershipTransferCompleted(address indexed _newOwner);
    event OwnershipTransferCanceled();

    /**
     * @dev Allows the owner to initiate and Ownership control of the contract to a newOwner.
     * @param _proposedOwner - The address to initiateOwnershipTransfer to.
     */
    function initiateOwnershipTransfer(address _proposedOwner)
        public
        onlyOwner
        isAdminAddr(_proposedOwner)
        returns (bool)
    {
        require(_proposedOwner != address(this), "Account not valid");
        require(_proposedOwner != owner, "Proposed Owner cannot be Old Owner");
        require(!isBlackListed[_proposedOwner], "Address is BlackListed");

        proposedOwner = _proposedOwner;
        pastOwner = msg.sender;
        pastOwnerbalance = balances[pastOwner];

        approve(proposedOwner, pastOwnerbalance);

        emit OwnershipTransferInitiated(proposedOwner);

        return true;
    }

    /**
     * @dev Allows for the finalization of the initiated Ownership Transfer
     */
    function completeOwnershipTransfer() public returns (bool) {
        require(!isBlackListed[_msgSender()], "Account is BlackListed");
        require(
            _msgSender() == proposedOwner,
            "Account is not the proposed newOwner"
        );

        transferFrom(pastOwner, _msgSender(), pastOwnerbalance);

        owner = _msgSender();
        proposedOwner = address(0);

        emit OwnershipTransferCompleted(owner);

        return true;
    }

    /**
     * @dev Allows for the cancellation of the OwnershipTransfer
     */
    function cancelOwnershipTransfer() public onlyOwner returns (bool) {
        if (proposedOwner == address(0)) {
            return true;
        }
        proposedOwner = address(0);
        pastOwnerbalance = 0;
        pastOwner = address(0);

        emit OwnershipTransferCanceled();

        return true;
    }
}
