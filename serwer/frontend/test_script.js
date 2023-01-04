const ProductsAdress = "/controller.php";
const DeleteAdress = "/controller.php";
const AddAdress = "/controller.php";

const GET_BUTTON = document.getElementById("get_button");
const DELETE_BUTTON = document.getElementById("delete_button");
const POST_BUTTON = document.getElementById("post_button");


const fetchProducts = async () => {
    const requestObject = {method: "GET"};
    const data = await fetch(ProductsAdress, requestObject).then(response => response.json());
    console.log(data);
    return data;
};

const addNewProduct = async newProduct => {
    const requestObject = {method: "POST", body: JSON.stringify(newProduct)};
    const response = await fetch(AddAdress, requestObject).then(response => response.json());
    console.log(response);
    return newProduct;    
};

const deleteProducts = async productsToDelete => {
    const ArrayOfProductsToDelete = Array.from(productsToDelete);
    const requestObject = {method: "DELETE", body: JSON.stringify(ArrayOfProductsToDelete)};
    const response = await fetch(DeleteAdress, requestObject).then(response => response.json());
    console.log(response);
    return ArrayOfProductsToDelete;  
};
const newProduct = {sku: "TR140666",
                    name: "Green Sofa With Steel Armrests",
                    price: 160.80, 
                    type: "Furniture",
                    height: 90,
                    width: 90,
                    length: 180}

GET_BUTTON.onclick = fetchProducts();
DELETE_BUTTON.onclick = deleteProducts(["TR140666"]);
POST_BUTTON.onclick = addNewProduct(newProduct);
