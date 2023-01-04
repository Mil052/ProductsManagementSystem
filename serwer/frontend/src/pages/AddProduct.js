import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "../store/productsSlice";
import { DvdDescription, BookDescription, FurnitureDescription } from "../components/productDescriptionForm";
import "./AddProduct.scss";

function AddProduct () {
    const [newProductData, setNewProductData] = useState({sku:"", name:"", price:""});
    const [newProductType, setNewProductType] = useState("DVD");
    const [newProductDescription, setNewProductDescription] = useState({});
  
    const status = useSelector(state => state.products.status);
    const error = useSelector(state => state.products.error);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "addSuccess") {
            return navigate("/");
        }
    }, [status]);

        // BUTTONS HANDLERS
    function clickCancelHandler () {return navigate("/")}

    function clickSaveHandler () {
        const combinedProductData = {...newProductData, type:newProductType, ...newProductDescription};
        dispatch(addNewProduct(combinedProductData));
    }
        // FORM HANDLERS
    function inputChangeHandler (event) {
        let inputName = event.target.name;
        let inputValue = event.target.value;
        setNewProductData(newProductData => ({...newProductData, [inputName]:inputValue}));
    }

    function typeChangeHandler (event) {
        setNewProductType(event.target.value);
        setNewProductDescription({});
    }

    return (
        <section>
            <header>
                <h2 className="header_title">Product Add</h2>
                <div className="header_buttons">
                    <button type="button" onClick={clickSaveHandler}>Save</button>
                    <button type="button" onClick={clickCancelHandler}>Cancel</button>
                </div>
            </header>
            <div className="error_display">
                {status === "addFail" ? (`Adding new product failed! ${error.message}`) : null}
            </div>
            <form id="product_form">
                <label htmlFor="sku">SKU</label>
                <input type="text" name="sku" id="sku" onChange={inputChangeHandler} />
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" onChange={inputChangeHandler} />
                <label htmlFor="price">Price</label>
                <input type="text" name="price" id="price" onChange={inputChangeHandler} />
                <label htmlFor="productType">Select Product Type</label>
                <select name="productType" id="productType" onChange={typeChangeHandler} >
                    <option value="DVD">DVD Disc</option>
                    <option value="Book">Book</option>
                    <option value="Furniture">Furniture</option>
                </select>
                {newProductType === "DVD" && <DvdDescription setDescription={setNewProductDescription} />}
                {newProductType === "Book" && <BookDescription setDescription={setNewProductDescription} />}
                {newProductType === "Furniture" && <FurnitureDescription setDescription={setNewProductDescription} />}
            </form>
        </section>
    );
}

export default AddProduct;