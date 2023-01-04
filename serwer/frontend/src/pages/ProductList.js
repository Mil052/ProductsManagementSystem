import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, deleteProducts } from "../store/productsSlice";
import ProductItem from "../components/ProductItem";
import "./ProductList.scss";

function ProductList () {
    const [productsToDelete, setProductsToDelete] = useState(new Set());
    
    const productsInStore = useSelector(state => state.products.items);
    const status = useSelector(state => state.products.status);
    const error = useSelector(state => state.products.error);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {dispatch(fetchProducts())},[]);

    function clickAddHandler () {return navigate("/add-products")}

    function clickDeleteHandler () {
        dispatch(deleteProducts(productsToDelete));
        setProductsToDelete(productsToDelete => {
            productsToDelete.clear();
            return productsToDelete;
        });
    }
    
    function toggleProductDelete (productSku, shouldBeDeleted) {
        if (shouldBeDeleted) {
            setProductsToDelete(productsToDelete => productsToDelete.add(productSku));
        } else {
            setProductsToDelete(productsToDelete => {
                productsToDelete.delete(productSku);
                return productsToDelete;
            });
        }
    }

    return (
        <section>
            <header>
                <h2 className="header_title">Product List</h2>
                <div className="header_buttons">
                    <button type="button" onClick={clickAddHandler}>ADD</button>
                    <button type="button" id="delete-product-btn" onClick={clickDeleteHandler}>MASS DELETE</button>
                </div>
            </header>
            <div className="error_display">
                {status === "fetchFail" ? (`Getting data failed! ${error.message}`) : null}
                {status === "deleteFail" ? (`Deleting products failed! ${error.message}`) : null}
            </div>
            <ul className="product-list">
                {productsInStore.map((product, index) => (
                    // Key value I have to setup in such a way that after delete objects operation no other object of THIS map get the key value of deleted object - in such a case checkbox of that item would be checked after rerender productItems !!!
                    <ProductItem key={product.sku} {...product} toggleProductDelete={toggleProductDelete}/>
                ))}
            </ul>
        </section>
    );
}

export default ProductList;