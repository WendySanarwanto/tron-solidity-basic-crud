const inventoryScAbi = require('./build/contracts/Inventory.json').abi;

module.exports = {
    "mainnet": {
        "inventorySc": {
            "address": process.env.MAIN_INVENTORY_SC,
            "abi": inventoryScAbi
        },
        "nonAdminPks": [process.env.MAIN_NON_ADMIN_PK]
    }
};
