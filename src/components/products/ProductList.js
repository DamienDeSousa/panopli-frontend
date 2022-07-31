import SingleProduct from "./SingleProduct";
import {useEffect, useState} from "react";

function ProductList({getProducts}) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/api/products/')
            .then((response) => response.json())
            .then(data => {
                setProducts(data);
                getProducts(data);
            })
            .catch((error) => console.log(error));
    }, [])

    return <div className={"row"}>
        {products.length > 0 && (
            products.map(product => (
                <SingleProduct singleProduct={product} key={`${product._id}`} />
            ))
        )}
    </div>
}

export default ProductList