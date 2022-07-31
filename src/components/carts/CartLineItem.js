import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

function CartLineItem(cartItem) {
    const item = cartItem.cartItem;
    const [product, setProduct] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3000/api/products/' + item.product)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.log(error));
    }, [])

    return <div className={"row"}>
        <div className={"col"}>
            {product &&
            <Link to={"/products/" + item.product}>{product.name}</Link>
            }
        </div>
        <div className={"col"}>
            Quantité: {item.quantity}
        </div>
        <div className={"col"}>
            taille: {item.selectedSize}
        </div>
        <div className={"col"}>
            couleur: {item.selectedColor}
        </div>
    </div>
}

export default CartLineItem;