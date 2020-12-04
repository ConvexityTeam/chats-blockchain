const { assert } = require("chai");

const FreeMoney = artifacts.require("./FreeMoney.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("FreeMoney", (accounts) => {
  let contract;

  before(async () => {
    contract = await FreeMoney.deployed();
  });

  describe("Deployment", async () => {
    it("... successfully deployed", async () => {
      const address = contract.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("... correct contract name", async () => {
      const name = await contract.name();
      assert.equal(name, "FreeMoney");
    });

    it("... has the correct symbol", async () => {
      const symbol = await contract.symbol();
      assert.equal(symbol, "FMY");
    });

    it("... deployed with 1Mil FMY Token", async () => {
      const amount = await contract.totalSupply();
      assert.equal(amount, '1000000000000000000000000');
    });
  });

  describe("Minting and Reddeming", async () => {
    it("... mints new tokens to SuperAdmin", async () => {
      const result = await contract.issue('1000000000000000000000000');
      const bal = await contract.balanceOf(accounts[0]);
      assert.equal(bal.toString(), '2000000000000000000000000');
      
      const event = result.logs[0].args;
      assert.equal(event.amount, '1000000000000000000000000', 'Issued amount is not correct');
    });

    it("... redeeming tokens from SuperAdmin", async () => {
      const result = await contract.redeem('1000000000000000000000000');
      const bal = await contract.balanceOf(accounts[0]);
      assert.equal(bal.toString(), '1000000000000000000000000');
      
      const event = result.logs[0].args;
      assert.equal(event.amount, '1000000000000000000000000', 'Redeemed amount is not correct');
    });
  });

  describe("ERC20 Functionalities", async () => {
    it("... transfer ", async () => {
      await contract.SetUserList(accounts[1], { from: accounts[0] });
      const result = await contract.transfer(accounts[1], '1000000000000000000000'); //1000
      const bal = await contract.balanceOf(accounts[1]);
      assert.equal(bal.toString(), '1000000000000000000000'); //1000
      
      const event = result.logs[0].args;
      assert.equal(event.value, '1000000000000000000000', 'Transfered amount is not correct'); //1000
    });

    it("... approve amount", async () => {
      await contract.SetUserList(accounts[2], { from: accounts[0] });
      const result = await contract.approve(accounts[2], '100000000000000000000', {from: accounts[1]} ); //100FMY
      const event = result.logs[0].args;
      
      assert.equal(event.value, '100000000000000000000', 'Approved amount is not correct'); //100FMY
    });

    it("... allowance ", async () => {
      const result = await contract.allowance(accounts[1], accounts[2], { from: accounts[2] });
      assert.equal(result.toString(), '100000000000000000000', 'Allowed amount is not correct'); //100FMY
    });

    it("... transferFrom ", async () => {
      await contract.SetUserList(accounts[3], { from: accounts[0] });

      const result = await contract.transferFrom(accounts[1], accounts[3], '10000000000000000000', { from: accounts[2] }); //10FMY
      const bal = await contract.balanceOf(accounts[3]);

      assert.equal(bal.toString(), '10000000000000000000');
      
      const event = result.logs[0].args;
      assert.equal(event.value.toString(), '10000000000000000000', 'Transfered amount is not correct');
      
    });


  });

  describe("OwnerShip Tranfer", async () => {
    it("... initiating Ownership Transfer", async () => {
      await contract.SetUserList(accounts[4], { from: accounts[0] });
      await contract.AddAdmin(accounts[4], { from: accounts[0] });
      const result = await contract.initiateOwnershipTransfer(accounts[4], { from: accounts[0] });
      const addr = await contract.proposedOwner();
          
      const event = result.logs[0].args;
      assert.equal(event.spender, addr, 'Proposed address is not correct');
    });

    it("... cancelling Ownership Transfer", async () => {
      const result = await contract.cancelOwnershipTransfer({ from: accounts[0] });
      
      assert.equal(result.receipt.status, true, 'cancelling Ownership Transferis not correct');
    });
        
    it("... completing Ownership Transfer", async () => {  
      await contract.AddAdmin(accounts[3], { from: accounts[0] });
      await contract.initiateOwnershipTransfer(accounts[3], { from: accounts[0] });
      await contract.completeOwnershipTransfer({ from: accounts[3] });
      
      const result = await contract.owner();
      const addr = await contract.proposedOwner();
        
      assert.equal(addr, '0x0000000000000000000000000000000000000000', 'Proposed account should be emptyed.');
      assert.equal(result, accounts[3], 'New owner has not been changed');
    });
  });

  describe("Operations Contract", async () => {
    it("... adding blackListed user", async () => {
      const result = await contract.AddBlackList(accounts[1], { from: accounts[0] });
      const event = result.logs[0].args;

      assert.equal(event._user, accounts[1], 'Address is added to Blocklist');
    });

    it("... destroying blackListed user's Fund", async () => {
      const bal = await contract.balanceOf(accounts[1]);
      await contract.DestroyBlackFunds(accounts[1], { from: accounts[3] });
      const bal1 = await contract.balanceOf(accounts[1]);

      assert.notEqual(bal.toString(), bal1.toString(), 'balances amount not distroyed')
    });

    it("... removing user from BlackList", async () => {
      const result1 = await contract.RemoveBlackList(accounts[1], { from: accounts[0] });
      const event1 = result1.logs[0].args;

      assert.equal(event1._user, accounts[1])
    });

  });
});
