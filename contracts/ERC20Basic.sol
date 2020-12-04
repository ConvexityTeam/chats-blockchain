pragma solidity ^0.5.0;

// import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "./Libs/IERC20.sol";
import "./Libs/SafeMath.sol";

/**
 * @title ERC20 interface
 */
contract ERC20Basic is IERC20 {
    using SafeMath for uint256;

    mapping(address => uint256) internal balances;

    /**
     * @dev Gets the balance of the specified address.
     * @param _address The address to return the its balance.
     * @return An uint256 representing the amount owned by the _address.
     */
    function balanceOf(address _address) public view returns (uint256 balance) {
        return balances[_address];
    }
}
