pragma solidity >= 0.4.25;

contract Admin {
    // Addresses of admins, appointed by owner
    mapping (address=>bool) private admins;

    // Admins count
    uint private adminsCount;

    // Trx/Eth Address of Inventory's owner
    address public owner;

    modifier restricted() {
        require(msg.sender == owner, "Access denied.");
        _;
    }

    modifier adminOnly() {
        require(admins[msg.sender], "Access denied.");
        _;
    }

    constructor() public {
       owner = msg.sender;
       // register owner as an admin as well
       admins[owner] = true;
       adminsCount = 1;
    }
}