import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Cookies from "js-cookie";

function SuccessCheckout() {
    const location = useLocation();
    const [order, setOrder] = useState({})

    useEffect(() => {
        setOrder(location.state);
        const cartId = Cookies.get('cart_id');
        fetch('http://localhost:3000/api/carts/flush-items/' + cartId, {method: 'PATCH'})
            .then(response => response.json())
            .then(data => {})
            .catch(error => console.log(error));
    }, [])

    return <div className={"container mt-4"}>
        <div className={"row"}>
            <div className={"col"}>
                <h6 className={"text-success"}>Merci pour votre confiance</h6>
                <p>Le numero de votre commande est le <span className={"fw-bold"}>{order._id}.</span></p>
                <p>Pour le passage de cette commande, Panopli vous offre 1 an de chocobons.</p>
            </div>
        </div>
    </div>
}

export default SuccessCheckout;
