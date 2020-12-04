pragma solidity ^0.5.0;

/**
 * @title ERC20Basic
 * @dev Simple version of FreeMoney ERC20 interface
 */
contract IERC20 {
    uint256 internal _totalSupply;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    function totalSupply() public view returns (uint256);

    function balanceOf(address who) public view returns (uint256);

    function transfer(address to, uint256 value) public returns (bool);

    function allowance(address _owner, address _spender)
        public
        view
        returns (uint256);

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool);

    function approve(address _spender, uint256 _value) public returns (bool);
}
