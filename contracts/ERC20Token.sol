pragma solidity ^0.5.0;

// import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "./Operations.sol";
import "./ERC20Basic.sol";
import "./Libs/SafeMath.sol";

/**
 * @title Basic FreeMoney token.
 */
contract ERC20Token is ERC20Basic, Operations {
    // additional variables for use if transaction fees ever became necessary
    uint256 public basisPointsRate = 0;
    uint256 public maximumFee = 0;

    uint256 public constant MAX_UINT = 2**256 - 1;

    mapping(address => mapping(address => uint256)) internal allowed;

    /**
     * @dev Fix for the ERC20 short address attack.
     */
    modifier onlyPayloadSize(uint256 size) {
        require(!(msg.data.length < size + 4));
        _;
    }

    /**
     * @dev transfer token for a specified address
     * @param _to The address to transfer to.
     * @param _value The amount to be transferred.
     */
    function transfer(address _to, uint256 _value)
        public
        checkUserList(_to)
        returns (bool)
    {
        //onlyPayloadSize(2 * 32)
        require(!isBlackListed[_to], "Account is BlackListed");

        uint256 fee = (_value.mul(basisPointsRate)).div(10000);
        if (fee > maximumFee) {
            fee = maximumFee;
        }
        uint256 sendAmount = _value.sub(fee);
        balances[_msgSender()] = balances[_msgSender()].sub(_value);
        balances[_to] = balances[_to].add(sendAmount);
        if (fee > 0) {
            balances[owner] = balances[owner].add(fee);
            emit Transfer(msg.sender, owner, fee);
        }
        emit Transfer(msg.sender, _to, sendAmount);

        return true;
    }

    /**
     * @dev Transfer tokens from one address to another
     * @param _from address The address which you want to send tokens from
     * @param _to address The address which you want to transfer to
     * @param _value uint the amount of tokens to be transferred
     */
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public checkUserList(_to) returns (bool) {
        //onlyPayloadSize(3 * 32)
        require(!isBlackListed[_to], "Account is BlackListed");

        uint256 _allowance = allowed[_from][msg.sender];

        uint256 fee = (_value.mul(basisPointsRate)).div(10000);
        if (fee > maximumFee) {
            fee = maximumFee;
        }
        if (_allowance < MAX_UINT) {
            allowed[_from][msg.sender] = _allowance.sub(_value);
        }
        uint256 sendAmount = _value.sub(fee);
        balances[_from] = balances[_from].sub(_value);
        balances[_to] = balances[_to].add(sendAmount);
        if (fee > 0) {
            balances[owner] = balances[owner].add(fee);
            emit Transfer(_from, owner, fee);
        }
        emit Transfer(_from, _to, sendAmount);

        return true;
    }

    /**
     * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
     * @param _spender The address which will spend the funds.
     * @param _value The amount of tokens to be spent.
     */
    function approve(address _spender, uint256 _value)
        public
        checkUserList(_spender)
        returns (bool)
    {
        //onlyPayloadSize(2 * 32)
        require(!isBlackListed[_spender], "Account is BlackListed");
        require(
            !((_value != 0) && (allowed[msg.sender][_spender] != 0)),
            "ERC20Token: Approved"
        );

        allowed[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    /**
     * @dev Function to check the amount of tokens that an owner allowed to a spender.
     * @param _owner address The address which owns the funds.
     * @param _spender address The address which will spend the funds.
     * @return A uint specifying the amount of tokens still available for the spender.
     */
    function allowance(address _owner, address _spender)
        public
        view
        returns (uint256 remaining)
    {
        return allowed[_owner][_spender];
    }
}
