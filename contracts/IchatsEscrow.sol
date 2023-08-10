// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.4;
pragma experimental ABIEncoderV2;

interface IchatsEscrow {

    function getFundAmount (address _funder) external returns (uint256);

    function getFundAvailability (address _funder) external returns (bool);

    function funderAvailable (address _funder) external returns (bool);

    function WithdrawalApprovalStatus (address _funder) external returns (bool);

    function getAdminSignature () external returns(bool);

    function getCampaignStatus () external returns (bool);

    function adminSignatory (address withdrawer) external returns (bool); 

    function endCampaign() external returns(bool);

    function resumeCampaign () external returns(bool);

    function fundCampaign (uint256  _amount) external returns (bool);

    function fundCampaignMatic () external returns (bool);

    function adminWithdrawFunds (uint256 _amount) external returns (bool);
}