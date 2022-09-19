// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "@openzeppelin/upgrades/contracts/Initializable.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./Operations.sol";

/**
 * @title Basic FreeMoney token.
 */
contract ChatsToken is Ownable, ERC20Permit, ReentrancyGuard {
    using SafeMath for uint256;
    Operations public operations;

    event Issue(uint256 amount, address indexed mintedTo);
    event Redeem(uint256 amount, address indexed redeemedFrom);
    event Params(uint256 feeBasisPoints, uint256 maxFee);

    uint256 public basisPointsRate = 0;
    uint256 public maximumFee = 0;
    uint256 public constant MAX_UINT = 2**256 - 1;
    uint256 public totalIssued;
    uint256 public totalRedeemed;

    /**
     * @dev Fix for the ERC20 short address attack.
     */
    modifier onlyPayloadSize(uint256 size) {
        require(!(msg.data.length < size + 4));
        _;
    }

    constructor(string memory _name,string memory _symbol, address _operations) ERC20Permit(_name) ERC20(_name, _symbol) {
    // name = _name;
    // symbol = _symbol;
    operations = Operations(_operations);
    }

    function decimals() public pure override returns (uint8) {
        return 3;
    }

    /**
     * Issue a new amount of tokens these tokens are deposited into the owner address
     * This is for issuing of token to the user or the beneficiary of the NGO
     * @param _amount Number of tokens to be issued
     */
    function issue(uint256 _amount, address _mintedTo)
    public
    nonReentrant
    onlyOwner 
    {
        require(operations.CheckUserList(_mintedTo), "User is not allowed to receive tokens");
        _mint(_mintedTo, _amount);
        totalIssued = totalIssued.add(_amount);
        emit Issue(_amount, _mintedTo);
    }

    /**
     * Redeem tokens.
     * These tokens are withdrawn from the owner address. the balance must be enough to cover the redeem
     * or the call will fail.
     *
     * @param _amount Number of tokens to be issued
     */
    function redeem(uint256 _amount) public {
        require(totalSupply() >= _amount, "Total supply is less than amount");
        require(balanceOf(msg.sender) >= _amount, "Balance is less than amount");
        _burn(msg.sender, _amount);
        totalRedeemed = totalRedeemed.add(_amount);
        emit Redeem(_amount, msg.sender);
    }

    function setParams(uint256 newBasisPoints, uint256 newMaxFee)
        public
        onlyOwner
    {
        require(newBasisPoints < 20, "Fee basis points should be less than 20");
        require(newMaxFee < 50, "Max fee should be less than 50");

        basisPointsRate = newBasisPoints;
        maximumFee = newMaxFee.mul(10**decimals());

        emit Params(basisPointsRate, maximumFee);
    }

    /**
     * @dev transfer token for a specified address
     * @param _to The address to transfer to.
     * @param _value The amount to be transferred.
     */
    function transferToken(address _to, uint256 _value)
        public
        returns (bool)
    {
        require(operations.CheckUserList(_to), "User is not allowed to receive tokens");
        require(!operations.isBlackListedAddress(_to), "Account is BlackListed");

        uint256 fee = (_value.mul(basisPointsRate)).div(10000);
        if (fee > maximumFee) {
            fee = maximumFee;
        }
        transfer(_to, _value.sub(fee));
        if (fee > 0) {
            transfer(owner(), fee);
        }
        emit Transfer(_msgSender(), _to, _value.sub(fee));

        return true;
    }

    /**
     * @dev Transfer tokens from one address to another
     * @param _from address The address which you want to send tokens from
     * @param _to address The address which you want to transfer to
     * @param _value uint the amount of tokens to be transferred
     */
    function transferTokenFrom(
        address _from,
        address _to,
        uint256 _value
    ) public
        returns (bool) {
        require(operations.CheckUserList(_to), "User is not allowed to receive tokens");
        require(!operations.isBlackListedAddress(_to), "Account is BlackListed");

        uint256 fee = (_value.mul(basisPointsRate)).div(10000);
        if (fee > maximumFee) {
            fee = maximumFee;
        }
        transferFrom(_from, _to, _value.sub(fee));
        if (fee > 0) {
            transferFrom(_from, owner(), fee);
        }

        return true;
    }
}
