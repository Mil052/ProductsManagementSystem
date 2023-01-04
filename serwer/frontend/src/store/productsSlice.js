import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchProductsAdress = "/api/products/get";
const addNewProductAdress = "/api/products/post";
const deleteProductsAdress = "/api/products/delete";

const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const requestObject = {method: "GET"};
    const response = await fetch(fetchProductsAdress, requestObject)
        .then(async response => {
            if (!response.ok) {
                const ErrorMessage = await response.json().then(data => data.message);
                throw new Error(ErrorMessage);
            }
            return response.json();
        });
    return response;
});

const addNewProduct = createAsyncThunk("products/addNewProduct", async newProduct => {
    const requestObject = {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(newProduct)};
    const response = await fetch(addNewProductAdress, requestObject)
        .then( async response => {
            if (!response.ok) {
                const ErrorMessage = await response.json().then(data => data.message);
                throw new Error(ErrorMessage);
            }
            return true;
        });
    return response;
});

const deleteProducts = createAsyncThunk("products/deleteProducts", async productsToDelete => {
    const ArrayOfProductsToDelete = Array.from(productsToDelete);
    const requestObject = {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(ArrayOfProductsToDelete)};
    const response = await fetch(deleteProductsAdress, requestObject)
        .then(async response => {
            if (!response.ok) {
                const ErrorMessage = await response.json().then(data => data.message);
                throw new Error(ErrorMessage);
            } 
            return true;
        });
    return ArrayOfProductsToDelete;
});

    // status: "fetchSuccess" | "fetchFail"| "addSuccess" | "addFail"| "deleteSuccess" | "deleteFail"
    // error: string | null

const productsSlice = createSlice ({
    name: "products",
    initialState: {
        items: [],
        status: null,
        error: null
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "fetchSuccess";
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "fetchFail";
                state.error = action.error;
            })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.status = "addSuccess";
                // state.items.push(action.payload);
            })
            .addCase(addNewProduct.rejected, (state, action) => {
                state.status = "addFail";
                state.error = action.error;
            })
            .addCase(deleteProducts.fulfilled, (state, action) => {
                state.status = "deleteSuccess";
                state.items = state.items.filter(product => !action.payload.includes(product.sku));
            })
            .addCase(deleteProducts.rejected, (state, action) => {
                state.status = "deleteFail";
                state.error = action.error;
            })
    }
});

export default productsSlice.reducer;
export { fetchProducts, addNewProduct, deleteProducts };