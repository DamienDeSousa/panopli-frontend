import {useParams} from "react-router-dom";
import {useState} from "react";
import Cookies from 'js-cookie';

function DetailsProduct(products) {
    const {id} = useParams()
    const product = products.products.filter(singleProduct => singleProduct._id === id).shift();
    const [quantity, setQuantity] = useState(1);

    const handleSubmit = (event) => {
        event.preventDefault();
        const cartId = Cookies.get('cart_id');
        const addCartItemRequestHeader = {
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                'cartId': cartId,
                'selectedSize': event.target['availableSize'].value,
                'selectedColor': event.target['availableColor'].value,
                'product': product,
                'quantity': quantity
            })
        };
        fetch('http://localhost:3000/api/carts/add-product/', addCartItemRequestHeader)
            .then((response) => response.status)
            .then(status => {})
            .catch(error => console.log(error));
    }

    return <div className={"row"}>
        <div>
            <div className={"row"}>
                <div className={"col"}>{product.name}</div>
                <div className={"col"}>Prix: {product.price}€</div>
                <div className={"col"}>stock: {product.stock}</div>
                <img src={product.images && "../" + product.images[0]} alt={"image"} className={"card-img-top"}/>
            </div>

            <form className={"row"} onSubmit={handleSubmit}>
                <div className={"col mb-2"}>
                    <select className={"form-select"} name={'availableSize'}>
                        {product && product.availableSize.map(size =>
                            <option value={size} key={`${size}`}>{size}</option>
                        )}
                    </select>
                </div>
                <div className={"col"}>
                    <select className={"form-select"} name={'availableColor'}>
                        {product && product.availableColor.map(color =>
                            <option value={color} key={`${color}`}>{color}</option>
                        )}
                    </select>
                </div>
                <div className={"col"}>
                    <input
                        type={"number"}
                        name={"quantity"}
                        value={quantity}
                        className={"form-control"}
                        onChange={(e) => setQuantity(e.target.value)}/>
                </div>
                <div className={"col-2"}>
                    <input type={"submit"} value={"Ajouter au panier"} className={"btn btn-success"} disabled={quantity < 1}/>
                </div>
            </form>
        </div>
    </div>
}

export default DetailsProduct