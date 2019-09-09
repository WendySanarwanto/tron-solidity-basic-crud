pragma solidity >= 0.4.25;
// pragma experimental ABIEncoderV2;
// import "github.com/Arachnid/solidity-stringutils/strings.sol";

import './Admin.sol';

contract Inventory is Admin {
    // using strings for *;

    // Product's definitions
    struct Product {
        uint id;
        string name;
        uint price; // TODO: This should be decimal
        uint quantity;
        bool exists;
        uint rowIndex;
    }
    // Mapping of ProductId to Product data
    mapping (uint=>Product) private products;
    // List of Product ids
    uint[] private productIds;
    // Product ID's counter
    uint private productIdCounter = 0;

    // Product Modifiers
    modifier productsMustExist() {
        //Check if there is at least 1 Product.
        require(productIds.length > 0, "Products list is emtpy.");
        _;
    }

    function createProduct(string memory name, uint price, uint initialQuantity) public adminOnly {
        productIdCounter++;
        Product memory newProduct = Product({
            id: productIdCounter,
            name: name,
            price: price,
            quantity: initialQuantity,
            exists: true,
            rowIndex: productIds.length
        });

        productIds.push(newProduct.id);
        products[newProduct.id] = newProduct;
    }

    /**
     * Delete a Product
     */
    function deleteProduct(uint id) public adminOnly {
        uint targetIndex = products[id].rowIndex;

        uint lastRowProductId = productIds[productIds.length-1];
        Product storage lastRowProduct = products[lastRowProductId];

        productIds[targetIndex] = lastRowProductId;
        productIds.length = productIds.length - 1;
        lastRowProduct.rowIndex = targetIndex;

        products[id].exists = false;
        delete products[id];
    }

    /**
     * Update a Product info
     */
    function updateProduct(uint id, string memory name, uint price, uint quantity) public adminOnly {
        // Check if product with specified id does exist
        require(products[id].exists, "Product with specified id does not exist");

        Product storage targetProduct = products[id];
        targetProduct.name = name;
        targetProduct.price = price;
        targetProduct.quantity = quantity;
    }

    /**
     * Get length of Products list.
     */
    function getProductsLength() public view returns(uint) {
        return productIds.length;
    }

    /**
     * Get Product that is placed as last row in list.
     */
    function getProductInLastRow() public view  productsMustExist returns(uint, string memory, uint, uint, uint) {
        // Check if product with specified id does exist
        uint lastRowProductId = productIds[productIds.length-1];
        Product memory product = products[lastRowProductId];
        require(product.exists, "Product with specified id does not exist.");
        return (product.id, product.name, product.price, product.quantity, product.rowIndex);
    }

    /**
     * Get Product by specified id
     */
    function getProductById(uint id) public view productsMustExist returns(uint, string memory, uint, uint, uint) {
        // Check if product with specified id does exist
        require(products[id].exists, "Product with specified id does not exist");
        Product memory product = products[id];
        return (product.id, product.name, product.price, product.quantity, product.rowIndex);
    }

    /**
     * TODO: Get all available Products. Add pagination support.
     */

    /**
     * TODO: Get all products whose name match with specified keyword. Add pagination support.
     */

}