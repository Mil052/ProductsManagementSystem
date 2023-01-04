import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import AddProduct from "./pages/AddProduct";
import './App.scss';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<ProductList/>} />
                    <Route exact path="/add-products" element={<AddProduct/>} />
                </Routes>
                <footer>
                    <h3>MIŁOSZ GAJDA </h3>
                    <p>Scandiweb Test Assignment</p>
                </footer>
            </BrowserRouter>
        </div>
    );
}

export default App;
