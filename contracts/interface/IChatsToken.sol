// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IChatsToken {
// function decimals() external pure override returns (uint8);
function issue(uint256 _amount, address _mintedTo) external;
function redeem(uint256 _amount) external;
function setParams(uint256 newBasisPoints, uint256 newMaxFee) external;
function transferToken(address _to, uint256 _value) external returns (bool);
function transferTokenFrom(address _from, address _to,uint256 _value) external returns (bool);
}