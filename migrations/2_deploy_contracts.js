// var MyContract = artifacts.require("./MyContract.sol");
const Migrations = artifacts.require("../contracts/Migrations.sol");
const Admin = artifacts.require("../contracts/Admin.sol");
const Inventory = artifacts.require("../contracts/Inventory.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Admin);
  deployer.link(Admin, Inventory);
  deployer.deploy(Inventory);
};
