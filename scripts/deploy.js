const { ethers, upgrades } = require("hardhat");

async function main() {
   const gas = await ethers.provider.getGasPrice()
   const chats = await ethers.getContractFactory("Chats");
   const operation = await ethers.getContractFactory("Operations");

   console.log("Deploying CHATS Operations contracts...");
   const ops = await operation.deploy();
   await ops.deployed();
   console.log("Operation Contract deployed to:", ops.address);
   // const upgradeableOPs = await upgrades.deployProxy(operation, {
   //    gasPrice: gas, 
   //    initializer: "initialvalue",
   // });
   // await upgradeableOPs.deployed();
   // console.log("Upgradeable upgradeableOPs Contract deployed to:", upgradeableOPs.address);

   console.log("Deploying CHATS contracts...");
   const chatsdeploy = await chats.deploy('CHATS', 'CHS', ops.address);
   await chatsdeploy.deployed();
   console.log("CHATS Contract deployed to:", chatsdeploy.address);

   // const upgradeableOPs = await upgrades.deployProxy(operation, {
   //    gasPrice: gas, 
   //    initializer: "initialvalue",
   // });
   // const chats = await upgrades.deployProxy(chats, 'CHATS', 'CHS', upgradeableOPs.address, {
   //    gasPrice: gas, 
   //    initializer: "initialvalue",
   // });
   // await upgradeable.deployed();
   // console.log("Upgradeable CHATS Contract deployed to:", upgradeable.address);
}

main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
 });