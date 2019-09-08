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

### TODOs

1. Implement functions which returns all data and also support: Pagination & Field's filtering, in the CRUD Smartcontract.

2. Refactor [Admin.sol](https://github.com/WendySanarwanto/tron-solidity-basic-crud/blob/master/contracts/Admin.sol) contract to use RBAC (Role-Based-Access-Control) feature, taken from [Open Zeppelin](https://openzeppelin.com/contracts/)'s RBAC contracts.

3. Design & Implement a new smartcontract which acts as Manager & Factory of the CRUD smartcontract.

4. Add/apply solidity [Best practices & Patterns](https://www.sitepoint.com/smart-contract-safety-best-practices-design-patterns/?fbclid=IwAR0GvB1tNcnjyIuMRomGTj6MofeiLIUyQRzy8e1etlhqDEInRmznEL8EJNE) on existing smartcontracts.

