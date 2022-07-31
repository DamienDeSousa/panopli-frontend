import Cookies from 'js-cookie';
import {useEffect, useState} from "react";
import CartLineItem from "./CartLineItem";
import {useNavigate} from "react-router-dom";

function CartDetails(products) {
    const cartId = Cookies.get('cart_id');
    const [cart, setCart] = useState({
        selectedProducts: []
    });
    const [total, setTotal] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/api/carts/' + cartId)
            .then(response => response.json())
            .then(data => {
                setCart(data);
                calculateTotal(data);
            })
            .catch(error => console.log(error));
    }, [])

    const flushCart = () => {
        const headers = {
            'method': 'PATCH'
        }
        fetch('http://localhost:3000/api/carts/flush-items/' + cartId, headers)
            .then(response => response.json())
            .then(data => {
                setCart(data);
                calculateTotal(data);
            })
            .catch(error => console.log(error));
    }

    const calculateTotal = (cart) => {
        let total = 0;
        for (let selectedProduct of cart.selectedProducts) {
            let product = products.products.filter(singleProduct => singleProduct._id.toString() === selectedProduct.product).shift();
            total += parseInt(selectedProduct.quantity) * parseFloat(product.price);
        }

        setTotal(total);
    }

    return <div className={"container"}>
        {cart.selectedProducts.map((item, index) => (
                <CartLineItem cartItem={item} key={index}/>
            )
        )}
        <div className={"row mt-2"}>
            <div className={"col"}>
                Total: {total}€
            </div>
        </div>
        <div className={"row mt-2"}>
            <div className={"col"}>
                <button
                    onClick={flushCart}
                    className={"btn btn-danger"}
                    disabled={cart.selectedProducts.length <= 0}
                >
                    Vider le panier
                </button>
                <button
                    onClick={() =>
                        navigate(
                            '/checkout/',
                            {
                                state: {
                                    'total':total,
                                    'selectedProducts': cart.selectedProducts,
                                    'products':products.products
                                }
                            }
                        )
                    }
                    className={"btn btn-success ms-3"}
                    disabled={cart.selectedProducts.length <= 0}
                >
                    Valider le panier
                </button>
            </div>
        </div>
    </div>
}

export default CartDetails;
