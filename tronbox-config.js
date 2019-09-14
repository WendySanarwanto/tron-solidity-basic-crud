require('dotenv').config();

const inventoryScAbi = require('./build/contracts/Inventory.json').abi;

module.exports = {
    "currentNet": process.env.CURRENT_NET,
    "mainnet": {
        "inventorySc": {
            "address": process.env.MAIN_INVENTORY_SC,
            "abi": inventoryScAbi
        },
        "nonAdminPks": [process.env.MAIN_NON_ADMIN_PK]
    },
    "shasta": {
        "inventorySc": {
            "address": process.env.SHASTA_INVENTORY_SC,
            "abi": inventoryScAbi
        },
        "nonAdminPks": [process.env.SHASTA_NON_ADMIN_PK]
    }
};
