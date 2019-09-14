const assert = require('assert');
const TronWeb = require('tronweb');
const config = require('../tronbox-config');
const netConfig = require('../tronbox').networks[config.currentNet];

const { fullHost, privateKey } = netConfig;

const paracetamolProduct = {
    name: 'Paracetamol 500mg tablet',
    price: 1, // in trx
    quantity: 1600       
};  

describe('Inventory smartcontract', () => {      
    let inventoryContract = null;
    let inventoryScAbi = null;
    let createdProductId = null;
    const responseDelay = 1000;

    beforeAll(async () => {
        try {
            const inventoryScAddress = config[config.currentNet].inventorySc.address;
            const tronWeb = new TronWeb({
                fullHost, privateKey
            });
            inventoryContract = await tronWeb.contract().at(inventoryScAddress);
            inventoryScAbi = inventoryContract.abi;
        } catch(err) {
            console.log(`[error] err: \n`, err);
        }
    });

    it(`should be exist in '${config.currentNet}'`, async () => {
        // console.log(`[debug] inventoryContract: \n`, inventoryContract);
        // console.log(`[debug] inventoryContract.tronWeb: \n`, inventoryContract.tronWeb);
        assert.ok(inventoryContract);
        assert.ok(Array.isArray(inventoryScAbi) && (inventoryScAbi.length > 0));
    });

    it(`should have no products after being deployed, previously`, async () => {
        const getProductsLengthResponse = await inventoryContract.getProductsLength().call();
        assert.ok(getProductsLengthResponse);
        const productsLength = getProductsLengthResponse.toNumber();
        console.log(`[DEBUG] productsLength: ${productsLength}`);
        // assert.equal(productsLength, 0);
    });

    it(`should allow admin to create a new product`, async () => {
        const { name, price, quantity } = paracetamolProduct;
        const createProductResponse = await inventoryContract.createProduct(name, price, quantity)
                                .send();
        assert.ok(createProductResponse);
    });

    it(`should allow admins to get Product in last row`, (done) => {
        setTimeout(async ()=>{
            const getProductInLastRowResponse = await inventoryContract.getProductInLastRow().call();
            const { name, price, quantity } = paracetamolProduct;
            assert.ok(Array.isArray(getProductInLastRowResponse) && (getProductInLastRowResponse.length === 5));
            createdProductId = getProductInLastRowResponse[0].toNumber();
            assert.ok(createdProductId > 0);
            assert.equal(getProductInLastRowResponse[1].toString(), name);
            assert.equal(getProductInLastRowResponse[2].toNumber(), price);
            assert.equal(getProductInLastRowResponse[3].toNumber(), quantity);
            assert.ok(getProductInLastRowResponse[4].toNumber() >= 0);
            // console.log(`[DEBUG] product: \n`, product);
            done();    
        }, responseDelay);
    });

    it(`should allow admins to update an existing product`, async(done) => {
        assert.ok(createdProductId);
        const { name } = paracetamolProduct;
        const newPrice = 3;
        const newQuantity = 5000;
        const updateProductResponse = await inventoryContract.updateProduct(
            createdProductId, name, newPrice, newQuantity
        ).send();
        assert.ok(updateProductResponse);
        
        setTimeout(async ()=>{
            const getProductByIdResponse = await inventoryContract.getProductById(createdProductId).call();
            assert.ok(Array.isArray(getProductByIdResponse) && (getProductByIdResponse.length === 5));        
            assert.equal(getProductByIdResponse[2].toNumber(), newPrice);
            assert.equal(getProductByIdResponse[3].toNumber(), newQuantity);
            done();
        }, responseDelay);
    });

    it(`should allow admins to delete an existing product by id`, async(done) => {
        assert.ok(createdProductId);
        const getProductInLastRowResponse = await inventoryContract.getProductInLastRow().call();
        assert.ok(Array.isArray(getProductInLastRowResponse) && (getProductInLastRowResponse.length === 5));
        const productId = getProductInLastRowResponse[0].toNumber();
        assert.ok(productId > 0);
        
        const deleteProductResponse = await inventoryContract.deleteProduct(productId).send();
        assert.ok(deleteProductResponse);

        setTimeout(async () => {
            const getProductsLengthResponse = await inventoryContract.getProductsLength().call();
            assert.ok(getProductsLengthResponse);
            console.log(`[debug] getProductsLengthResponse: \n`, getProductsLengthResponse);
            const productsLength = getProductsLengthResponse.toNumber();
            assert.equal(productsLength, 0);
            done();
        }, responseDelay);
    });
});

// xdescribe(`Inventory smartcontract's RBAC`, () => {
//     const nonAdminPk = config.mainnet.nonAdminPks[0];
//     let inventoryContract = null;
//     let tronWeb = null

//     beforeAll(async () => {
//         try {
//             const inventoryScMainnetAddress = config.mainnet.inventorySc.address;
//             tronWeb = new TronWeb({
//                 fullHost, 
//                 privateKey: nonAdminPk
//             });
//             inventoryContract = await tronWeb.contract().at(inventoryScMainnetAddress);
//             inventoryScAbi = inventoryContract.abi;
//         } catch(err) {
//             console.log(`[error] err: \n`, err);
//         }
//     });
    
//     isReverted = (txId, timeout = 4000) => {
//         return new Promise((resolve, _) => {
//             setTimeout(async () => {
//                 const transactionInfo = await tronWeb.trx.getTransaction(txId);
//                 console.log(`[debug] transactionInfo: \n`, transactionInfo);                
//                 resolve(transactionInfo.ret[0].contractRet === 'REVERT');
//             }, timeout);    
//         });
//     }

//     it(`should returns error when non-admin attempt to create a new product`, async () => {
//         assert.ok(inventoryContract);
//         assert.ok(Array.isArray(inventoryScAbi) && (inventoryScAbi.length > 0));            
      
//         const { name, price, quantity } = paracetamolProduct;
//         const createProductResponse = 
//             await inventoryContract.createProduct(name, price, quantity)
//                                     .send();
//         const _isReverted = await isReverted(createProductResponse);;
//         assert.equal(_isReverted, true);
//     });
//     // TODO: IMplement this
// });