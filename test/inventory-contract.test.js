const assert = require('assert');

const InventoryContract = artifacts.require('./Inventory.sol');

contract('Inventory', accounts => {
    const paracetamolProduct = {
        name: 'Paracetamol 500mg tablet',
        price: '100000000000000000', // in wei
        quantity: 1600        
    };
    let paracetamolProductId = null;

    it(`should have no products after being created.`, async () => {
        const inventory = await InventoryContract.deployed();
        const getProductsLengthResponse = await inventory.call('getProductsLength');
        assert.ok(getProductsLengthResponse);
        const productsLength = getProductsLengthResponse.toNumber();
        assert.equal(productsLength, 0);
    });

    it(`should allow admins to create a new product`, async () => {
        const inventory = await InventoryContract.deployed();
        const expectedProduct = {
            ...paracetamolProduct,
            rowIndex: 0
        };
        const createProductResponse = await inventory.call('createProduct',[expectedProduct.name, expectedProduct.price, expectedProduct.quantity]);
        assert.ok(createProductResponse);

        const getProductInLastRowResponse = await inventory.call('getProductInLastRow');
        assert.ok(Array.isArray(getProductInLastRowResponse) && (getProductInLastRowResponse.length > 0) );
        const createdProduct = {
            id: 0,
            ...paracetamolProduct,
            rowIndex: 0
        };
        paracetamolProductId = getProductInLastRowResponse[0].toNumber();
        assert.equal(getProductInLastRowResponse[0].toNumber(), 1);
        assert.equal(getProductInLastRowResponse[1], expectedProduct.name);
        assert.equal(getProductInLastRowResponse[2].toString(), expectedProduct.price);
        assert.equal(getProductInLastRowResponse[3].toNumber(), expectedProduct.quantity);
        assert.equal(getProductInLastRowResponse[4].toNumber(), expectedProduct.rowIndex);
    });
    
    it(`should allow admins to get existing product by its id`, async () => {
        const inventory = await InventoryContract.deployed();
        const expectedProduct = {
            id: paracetamolProductId,
            ...paracetamolProduct,
            rowIndex: 0
        };
        const getProductByIdResponse = await inventory.call('getProductById', [paracetamolProductId]);
        assert.ok(Array.isArray(getProductByIdResponse) && getProductByIdResponse.length > 0);
        assert.equal(getProductByIdResponse[0].toNumber(), paracetamolProductId);
        assert.equal(getProductByIdResponse[1], expectedProduct.name);
        assert.equal(getProductByIdResponse[2].toString(), expectedProduct.price);
        assert.equal(getProductByIdResponse[3].toNumber(), expectedProduct.quantity);
        assert.equal(getProductByIdResponse[4].toNumber(), expectedProduct.rowIndex);
    });

    it(`should allow admins to update existing product by its id`, async () => {
        const inventory = await InventoryContract.deployed();
        const { name } = paracetamolProduct;
        const newPrice = '150000000000000000';
        const newQuantity = 5000;
        const updateProductResponse = await inventory.call('updateProduct', [paracetamolProductId, name, newPrice, newQuantity]);
        assert.ok(updateProductResponse);

        const getProductByIdResponse = await inventory.call('getProductById', [paracetamolProductId]);
        assert.ok(Array.isArray(getProductByIdResponse) && getProductByIdResponse.length > 0);
        assert.equal(getProductByIdResponse[2].toString(), newPrice);
        assert.equal(getProductByIdResponse[3].toNumber(), newQuantity);
    });

    it(`should allow admins to delete an existing product`, async () => {
        const inventory = await InventoryContract.deployed();

        const getProductInLastRowResponse = await inventory.call('getProductInLastRow');
        assert.ok(Array.isArray(getProductInLastRowResponse) && (getProductInLastRowResponse.length > 0) );
        
        const productId = getProductInLastRowResponse[0].toNumber();        
        assert.ok(productId > 0);
        
        const deleteProductResponse = await inventory.call('deleteProduct', [productId]);
        assert.ok(deleteProductResponse);

        const getProductsLengthResponse = await inventory.call('getProductsLength');
        const productsLength = getProductsLengthResponse.toNumber();        
        assert.equal(productsLength, 0);
    });
    
});