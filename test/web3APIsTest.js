/* eslint-disable no-console */
const trnx = require("../src/connectWeb3/index");

async function TestingWeb3APIs() {
  try {
    const GetName = await trnx.getName().then(async (result) => {
      return result;
    });
    console.log("1) Contract Name  >>>", GetName, " Contract");
    
    const IsPaused = await trnx.isPaused().then(async (result) => {
      return result;
    });
    console.log("2) Contract Pause >>> ", IsPaused);

    const GetOwner = await trnx.getOwner().then(async (result) => {
      return result;
    });
    console.log("3) Contract Owner >>>", GetOwner);

    const User = await trnx.createAccount("CHArl!307").then((result) => {
      return result;
    });
    console.log("4) User Created   >>>", User);

    //Create Admin 1
    const AdminAcc = await trnx.createAccount("CHArl!307").then((result) => {
      return result;
    });
    console.log("5) Admin Created  >>>", AdminAcc);

    // Add the above created account as an Admin
    const AddAdmin = await trnx.addAdmin(AdminAcc).then((result) => {
      return result;
    });
    console.log("6) Added  Admin   >>>", AddAdmin);

    // Create Authoriser 1
    const AuthoriserAcc = await trnx.createAccount("CHArl!307").then((result) => {
      return result;
    });
    console.log("7) Authoriser Created >>>", AuthoriserAcc);

    // Add the above created account as an Admin
    const AddAuthorizer = await trnx.addAuthorizer(AuthoriserAcc).then((result) => {
      return result;
    });
    console.log("8) Authoriser Added >>>", AddAuthorizer);

    const UserList = await trnx.isUserListed(User).then(async (result) => {
      return result;
    });
    console.log("9) User is Listed >>> ", UserList);

    const AdminList = await trnx.isAdmin(AdminAcc).then(async (result) => {
      return result;
    });
    console.log("10) Admin is Listed>>> ", AdminList);

    const AuthList = await trnx.isAuthorizer(AuthoriserAcc).then(async (result) => {
      return result;
    });
    console.log("11) Auth is Listed >>> ", AuthList);

    const BlackList = await trnx.isBlackListed(User).then(async (result) => {
      return result;
    });
    console.log("12) Is BlackListed >>> ", BlackList);

    const GetUsersList = await trnx.getUsersList(GetOwner).then(async (result) => {
      return result;
    });
    console.log("13) Users List >>> ", GetUsersList);

    const GetAdminList = await trnx.getAdminList(AdminAcc).then(async (result) => {
      return result;
    });
    console.log("14) Admin List >>> ", GetAdminList);

    const GetAuthorizerList = await trnx.getAuthorizerList(GetOwner).then(async (result) => {
      return result;
    });
    console.log("15) Authorizer List >>> ", GetAuthorizerList);

    const Approved = await trnx.appove(User, "CHArl!307", AuthoriserAcc, '10000000000000000000').then(async (result) => {
      return result;
    });
    console.log("16) Approved  >>> ", Approved);

    const Allowance = await trnx.allowance(User, AuthoriserAcc).then(async (result) => {
      return result;
    });
    console.log("17) Allowance >>> ", Allowance);

    const Balance = await trnx.balanceOf(GetOwner).then(async (result) => {
      return result;
    });
    console.log("18) Balance of", GetOwner, "is", Balance);
 
    const TransferAdmin = await trnx.transferAdmin(User, '10000000000000000000' ).then((result) => {
      return result;
    });
    console.log("19) Admin Transfered >>>", TransferAdmin);

    const Transfer = await trnx.transfer( User, "CHArl!307", AuthoriserAcc , '1000000000000000000').then((result) => {
      return result;
    });
    console.log("20) Transfered >>>", Transfer);

    const TransferFrom = await trnx.transferFrom( User, AuthoriserAcc, "CHArl!307", '1000000000000000000').then((result) => {
      return result;
    });
    console.log("21) TransferedFrom >>>", TransferFrom);

    const Minted = await trnx.minting('1000000000000000000', User).then((result) => {
      return result;
    });
    console.log("22) Minting  works >>>", Minted);

    const Redeemed = await trnx.redeeming('1000000000000000000').then((result) => {
      return result;
    });
    console.log("23) Redeeming works >>>", Redeemed);

    const AddBlackList = await trnx.addBlackList(User, AdminAcc, "CHArl!307").then((result) => {
      return result;
    });
    console.log("24) Evil User BlackListed >>>", AddBlackList);

    const GetBlackListed = await trnx.getBlackListed(GetOwner).then(async (result) => {
      return result;
    });
    console.log("25) BlackListed Users >>> ", GetBlackListed);

    const DestroyBlackFund = await trnx.destroyBlackFunds(User).then((result) => {
      return result;
    });
    console.log("26) Destroyed BlackFund >>>", DestroyBlackFund);

    const RemoveBlackList = await trnx.removeBlackList(User, AdminAcc, "CHArl!307").then((result) => {
      return result;
    });
    console.log("27) Evil User removed from BlackList >>>", RemoveBlackList);

    const RemoveUserList = await trnx.removeUserList(User, AdminAcc, "CHArl!307").then((result) => {
      return result;
    });
    console.log("28) Evil User removed from UserList >>>", RemoveUserList);
    
    const RemoveAuthorizer = await trnx.removeAuthorizer(AuthoriserAcc).then((result) => {
      return result;
    });
    console.log("29) Evil Authoriser removed from List >>>", RemoveAuthorizer);

    const RemoveAdmin = await trnx.removeAdmin(AdminAcc).then((result) => {
      return result;
    });
    console.log("30) Evil Admin removed from List >>>", RemoveAdmin);

    const TotalSupply = await trnx.totalSupply().then(async (result) => {
      return result;
    });
    console.log("31) Total Token Supply  >>> ", TotalSupply);

    const TotalIssued = await trnx.totalIssued(GetOwner).then(async (result) => {
      return result;
    });
    console.log("32) Total Token Issued  >>> ", TotalIssued);

    const TotalRedeemed = await trnx.totalRedeemed(GetOwner).then(async (result) => {
      return result;
    });
    console.log("33) Total Token Redeemed>>> ", TotalRedeemed);


    console.log("* * *    END OF TEST   * * *");
  
  } catch (error) {
    console.log("error>>>", error);
  }
}

TestingWeb3APIs();
