# tron-solidity-basic-crud

A solidity project which demonstrates CRUD functions in a solidity smartcontract and how to secure it using RBAC contract methods.

## How do I run this demo

### Pre-requisites

1. Setup [docker-ce](https://docs.docker.com/install/).

2. Install Latest stable version of [Node.js](https://nodejs.org/en/).

3. **Optional**: Install [Visual Studio Code](https://code.visualstudio.com/) and then install these plugins:

    * [solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity).

    * [Solidity Visual Auditor](https://marketplace.visualstudio.com/items?itemName=tintinweb.solidity-visual-auditor).

4. **Optional**: Install [yarn](https://yarnpkg.com/lang/en/) if you prefer other alternative of **Node.js** package manager than **Npm**.

### Setup and run the demo in local

1. Clone this repository in your local machine, by running `git clone https://github.com/WendySanarwanto/tron-solidity-basic-crud.git` command, on your terminal window.

    ![alt text](https://github.com/WendySanarwanto/tron-solidity-basic-crud/blob/master/readme_assets/1_clone_repo.png)

2. Change current directory into the cloned repository's root directory.

    ![alt text](https://github.com/WendySanarwanto/tron-solidity-basic-crud/blob/master/readme_assets/2_change_to_repo_dir.png)

3. Install the project's NPM dependencies by running either one of these commands: `npm i` or `yarn`, in your terminal.

    ![alt text](https://github.com/WendySanarwanto/tron-solidity-basic-crud/blob/master/readme_assets/3_install_dependencies_yarn.png)

4. Start [Tron](https://developers.tron.network/) local development node by running `npm run startnode` command in your terminal.

    ![alt text](https://github.com/WendySanarwanto/tron-solidity-basic-crud/blob/master/readme_assets/4_start_tron_node.png)

5. Display the node's startup log messages through running `docker logs -f tron` command. Lookup, block, copy or note one or more Account address(es) and their Private Key(s).

    ![alt text](https://github.com/WendySanarwanto/tron-solidity-basic-crud/blob/master/readme_assets/5_accounts_private_keys.png)

6. Open the `tronbox.js` file, lookup for `localdev` property, and then replace the value of `from` property with one of Account address you noted in prior step, also replace the value of `privateKey` property with the selected Account address'es Private Key.

    ![alt text](https://github.com/WendySanarwanto/tron-solidity-basic-crud/blob/master/readme_assets/6_set_from_private_key.png)

7. Run `npm run cdtl` command to compile all `.sol` files, deploy them into the local fullnode and then execute the [test](https://github.com/WendySanarwanto/tron-solidity-basic-crud/blob/master/test/inventory-contract.test.js), at once. Confirm that there are no errors and all tests are passed.

    ![alt text](https://github.com/WendySanarwanto/tron-solidity-basic-crud/blob/master/readme_assets/7_cdtl_1.png)

    ![alt text](https://github.com/WendySanarwanto/tron-solidity-basic-crud/blob/master/readme_assets/7_cdtl_2.png)

## Deploy the Smartcontract to Shasta (Test Net) & Run the Automated Integration Tests

### Creating a new Tron account for Development & Testing

1. Open your browser tab and browse to [Tronscan](https://tronscan.org) page.

2. Click **SIGN IN** link on top-right of the page then followed by clicking **IMPORT A WALLET** dropped menu item.

    ![alt text](https://github.com/WendySanarwanto/tron-solidity-basic-crud/blob/master/readme_assets/8_access_import_wallet_menu.png)

3. On the shown modal dialog, click **CREATE WALLET** button.

    ![alt text](https://github.com/WendySanarwanto/tron-solidity-basic-crud/blob/master/readme_assets/9_click_create_wallet.png)

4. Follow instructions on next page and ensure that you make notes both the Public & Private keys of the created account.

### Request TRX test coins from Fauchet and freeze them

1. On your browser tab, browse to [TRX's Fauchet](https://www.trongrid.io/shasta) page.

2. Copy & Paste the Public address of the created dev/test account into `Test wallet address` textbox input and click **SUBMIT** button. Notice that 10000 TRX is sent into the account.

    ![alt text](https://github.com/WendySanarwanto/tron-solidity-basic-crud/blob/master/readme_assets/10_enter_wallet_address_on_fauchet.png)

3. Repeat this step until the account has at least 200k TRX or higher.

    ![alt text](https://github.com/WendySanarwanto/tron-solidity-basic-crud/blob/master/readme_assets/11_tronscan_account_after_received_100k_trx.png)

4. Browse to [Shasta Tronscan](https://shasta.tronscan.org), sign in by using the Dev/Test account and freeze all the received TRX Test Coins where 50% of the total TRX is frozen to get Bandwidth and the other 50% is frozen to get Energy.

    ![alt text](https://github.com/WendySanarwanto/tron-solidity-basic-crud/blob/master/readme_assets/12_freezing_trx_allocations.png)

    ![alt text](https://github.com/WendySanarwanto/tron-solidity-basic-crud/blob/master/readme_assets/13_frozen_allocated_trx.png)

### Compile & Deploy Inventory contract to Shasta

1. Create a new file in the root directory of this repository, and name it as **.env**.

2. Open the **.env** file and add this line: `SHASTA_PK=<private key of the test/dev account>`. Example:

    ```config
    SHASTA_PK=a73b387e99b838c3d0e4635b6b7d2358b0526f731d066d9db5a504a3c2b929aa
    ```

3. Back to terminal window and run `npm run compile` command to compile all smartcontract `.sol` files.

4. Run `npm run deployshasta` command to deploy (migrate) the compiled contracts to Shasta testnet. Confirm that migration process is finished successfully. Make note the deployed **Inventory** smartcontract's public address.

    ![alt text](https://github.com/WendySanarwanto/tron-solidity-basic-crud/blob/master/readme_assets/14_deploy_sc_to_shasta.png)

### Add more config parameters and Run the Integration tests

1. Edit the **.env** file and add this line: `SHASTA_INVENTORY_SC=<Deployed Inventory contract's address, noted in prior step>`.

2. Add this line in the **.env** file: `CURRENT_NET=shasta` to ensure that we are going to run the test against the contracts deployed on Shasta test net. Example of current **.env** file:

    ```config
    SHASTA_PK=a73b387e99b838c3d0e4635b6b7d2358b0526f731d066d9db5a504a3c2b929aa
    SHASTA_INVENTORY_SC=TCrcAbH3Umf6yGoDXtZBuNEjFJ9Qy5NkuC
    CURRENT_NET=shasta
    ```

3. On terminal, run `npm run specs` for starting the integration tests. Confirm that all tests are passed.

    ![alt text](https://github.com/WendySanarwanto/tron-solidity-basic-crud/blob/master/readme_assets/15_run_specs_against_shasta.png)

### Compile & Deploy Inventory contract to Main Net

1. Edit **.env** file and add this line: `MAIN_PK=<Private key of your main Tron's account>`.

2. Back to terminal window Back to terminal window and run `npm run deploymain` command to deploy (migrate) the compiled contracts to the Main net. Confirm that migration process is finished successfully. Make note the deployed **Inventory** smartcontract's public address.

### Change config parameters and Run the Integration tests

1. Edit the **.env** file and add this line: `MAIN_INVENTORY_SC=<Deployed Inventory contract's address, noted in prior step>`.

2. Change `CURRENT_NET` param from `shasta` to `mainnet`. Example of current **.env** file:

    ```config
    MAIN_PK=bedbbc9724de3f33e92c188c77210e4bf0503c66a0c6366ccdab7459668d067d
    SHASTA_INVENTORY_SC=
    SHASTA_PK=a73b387e99b838c3d0e4635b6b7d2358b0526f731d066d9db5a504a3c2b929aa
    SHASTA_INVENTORY_SC=TCrcAbH3Umf6yGoDXtZBuNEjFJ9Qy5NkuC
    CURRENT_NET=mainnet
    ```

3. **Ensure that all of your TRX in your main account are freezed and there are enough available Bandwidth & Energy**.

4. On terminal, run `npm run specs` for starting the integration tests. Confirm that all tests are passed.

### TODOs

1. Implement functions which returns all data and also support: Pagination & Field's filtering, in the CRUD Smartcontract.

2. Create additional Unit Tests and Integration Tests which test unauthorised access.

3. Refactor [Admin.sol](https://github.com/WendySanarwanto/tron-solidity-basic-crud/blob/master/contracts/Admin.sol) contract to use RBAC (Role-Based-Access-Control) feature, taken from [Open Zeppelin](https://openzeppelin.com/contracts/)'s RBAC contracts.

4. Create ES6 Helper method(s) or a class that can be used to map Product tupple into JSON object, and use it to replace several lines in the test file.

5. Design & Implement a new smartcontract which acts as Manager & Factory of the CRUD smartcontract.

6. Add/apply solidity [Best practices & Patterns](https://www.sitepoint.com/smart-contract-safety-best-practices-design-patterns/?fbclid=IwAR0GvB1tNcnjyIuMRomGTj6MofeiLIUyQRzy8e1etlhqDEInRmznEL8EJNE) on existing smartcontracts.

7. Create the Web SPA clients in ReactJS, Angular and Vue.JS.

8. Deploy the Web SPA client into IPFS.
