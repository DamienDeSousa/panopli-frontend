import Banner from './Banner'
import ProductList from './products/ProductList'
import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DetailsProduct from "./products/DetailsProduct";
import CartDetails from "./carts/CartDetails";
import NavBar from "./NavBar";
import CheckoutDetails from "./checkouts/CheckoutDetails";
import {useCookies} from "react-cookie";
import SuccessCheckout from "./checkouts/SuccessCheckout";

function App() {
  const [products, setProducts] = useState([])
  const [cookies, setCookie] = useCookies(['card_id'])

  useEffect(() => {
    const createCartRequestHeader = {
      method: 'POST',
    };
    if (typeof cookies === 'undefined' || cookies === null) {
      fetch('http://localhost:3000/api/carts/', createCartRequestHeader)
          .then((response) => response.json())
          .then(cart => setCookie('cart_id', cart._id))
          .catch(error => console.log(error))
    }
  }, [])

  const getProducts = (products) => {
    setProducts(products);
  }

  return <React.Fragment>
    <Banner />
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path={"/"} element={<ProductList getProducts={getProducts}/>}/>&
        <Route exact path={"/products/:id"} element={<DetailsProduct products={products}/>} />
        <Route exact path={"/carts/:id"} element={<CartDetails products={products}/>} />
        <Route exact path={"/checkout/"} element={<CheckoutDetails />} />
        <Route exact path={"/order-success/"} element={<SuccessCheckout />}/>
      </Routes>
    </BrowserRouter>
  </React.Fragment>
}

export default App