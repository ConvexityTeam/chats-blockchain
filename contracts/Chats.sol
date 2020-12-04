pragma solidity ^0.5.0;

// import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "./ERC20Token.sol";
import "./ContractOwnershipTransfer.sol";

/**
 * @title Chats token
 *
 * @dev Implementation of the Chats standard token.
 */
contract Chats is ERC20Token, ContractOwnershipTransfer {
    /**
     * @param _name Token Name
     * @param _symbol Token _symbol
     * @param _decimals Token decimals
     */
    string public name = "CHATS";
    string public symbol = "CAS";
    uint256 public decimals = 18;

    // Called when new token are issued
    event Issue(uint256 amount);
    // Called when tokens are redeemed
    event Redeem(uint256 amount);
    // Called if contract ever adds fees
    event Params(uint256 feeBasisPoints, uint256 maxFee);

    /**
     * The contract can be initialized with a number of tokens
     * All the tokens are deposited to the owner address     *
     *
     * @param _initialSupply Initial supply of the contract 1000000000000000000000000 (1,000,0000 FMY Token)
     */
    constructor(uint256 _initialSupply) public {
        _totalSupply = _initialSupply;
        balances[owner] = _initialSupply;
        _totalIssued += _initialSupply;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    /**
     * Issue a new amount of tokens these tokens are deposited into the owner address
     *
     * @param _amount Number of tokens to be issued
     */
    function issue(uint256 _amount) public onlyOwner {
        require(_totalSupply + _amount > _totalSupply);
        require(balances[owner] + _amount > balances[owner]);

        balances[owner] += _amount;
        _totalSupply += _amount;
        _totalIssued += _amount;
        emit Issue(_amount);
    }

    /**
     * Redeem tokens.
     * These tokens are withdrawn from the owner address if the balance must be enough to cover the redeem
     * or the call will fail.
     *
     * @param _amount Number of tokens to be issued
     */
    function redeem(uint256 _amount) public onlyOwner {
        require(_totalSupply >= _amount);
        require(balances[owner] >= _amount);

        _totalSupply -= _amount;
        balances[owner] -= _amount;
        _totalRedeemed += _amount;
        emit Redeem(_amount);
    }

    function setParams(uint256 newBasisPoints, uint256 newMaxFee)
        public
        onlyOwner
    {
        // Ensure transparency by hardcoding limit beyond which fees can never be added
        require(newBasisPoints < 20);
        require(newMaxFee < 50);

        basisPointsRate = newBasisPoints;
        maximumFee = newMaxFee.mul(10**decimals);

        emit Params(basisPointsRate, maximumFee);
    }

    function totalIssued()
        public
        view
        isAdminAddr(_msgSender())
        returns (uint256)
    {
        return _totalIssued;
    }

    function totalRedeemed()
        public
        view
        isAdminAddr(_msgSender())
        returns (uint256)
    {
        return _totalRedeemed;
    }
}
