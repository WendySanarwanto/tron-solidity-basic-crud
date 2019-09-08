// var MyContract = artifacts.require("./MyContract.sol");
const Migrations = artifacts.require("../contracts/Migrations.sol");
const Inventory = artifacts.require("../contracts/Inventory.sol");

module.exports = function(deployer) {
  // console.log(`[debug] deployer: \n`, deployer);
  deployer.deploy(Migrations);
  deployer.deploy(Inventory);
};
