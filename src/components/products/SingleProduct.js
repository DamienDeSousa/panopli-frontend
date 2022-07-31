import {useNavigate} from "react-router-dom";

function SingleProduct(singleProduct) {
    const product = singleProduct['singleProduct']
    const navigate = useNavigate();

    return <div className={"col-sm-3 card"} style={{marginLeft: "1rem"}}>
        <img src={product.images[0]} alt={"image"} className={"card-img-top"}/>
        <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">stock: {product.stock}</p>
            <p className="card-text">prix: {product.price}€</p>
            <button onClick={() => navigate('/products/' + product._id)} className={"btn btn-primary"}>Détail</button>
        </div>
    </div>
}

export default SingleProduct