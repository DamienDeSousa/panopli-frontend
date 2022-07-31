import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import FlashMessage from "react-flash-message";

function CheckoutDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [productWithoutStock, setProductWithoutStock] = useState({})

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowErrorMessage(false);
        const selectedProducts = location.state.selectedProducts;
        const products = location.state.products;
        let isStockEnough = true;
        let productWithoutStock = {};
        for (let selectedProduct of selectedProducts) {
            let product = products.filter(singleProduct => singleProduct._id.toString() === selectedProduct.product).shift();
            if (product.stock < selectedProduct.quantity) {
                isStockEnough = false;
                productWithoutStock = product;
                break;
            }
        }

        isStockEnough ? handleCheckoutSuccess(event, products, selectedProducts) : handleCheckoutError(productWithoutStock);
        //if isStockEnough, send data to create order. then provide order to SuccessCheckout page
        //check if selectedQuantity < stock
    };

    const handleCheckoutSuccess = (event, products, selectedProducts) => {
        let items = [];
        for (let selectedProduct of selectedProducts) {
            let product = products.filter(singleProduct => singleProduct._id.toString() === selectedProduct.product).shift();
            let item = {
                product_id: product._id.toString(),
                name: product.name,
                price: product.price,
                quantity: selectedProduct.quantity,
                size: selectedProduct.selectedSize,
                color: selectedProduct.selectedColor
            }
            items.push(item);
        }

        const customer = {
            civility: event.target['civility'].value,
            firstname: event.target['firstname'].value,
            lastname: event.target['lastname'].value,
            email: event.target['email'].value,
            address: {
                street: event.target['street'].value,
                postalcode: event.target['postalcode'].value,
                town: event.target['town'].value,
                country: event.target['country'].value,
            }
        }

        const requestHeaders = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                'items': items,
                'customer': customer
            })
        }
        fetch('http://localhost:3000/api/orders/', requestHeaders)
            .then(response => response.json())
            .then(order => {
                navigate('/order-success/', {state: order});
            })
            .catch(error => console.log(error));
    };

    const handleCheckoutError = (productWithoutStock) => {
        setProductWithoutStock(productWithoutStock);
        setShowErrorMessage(true);
    };

    return <div className={"container"}>
        <form className={"row mt-5"} onSubmit={handleSubmit}>
            {showErrorMessage && (
                <FlashMessage persistOnHover={true}>
                    <div className="alert alert-danger" role="alert">
                        <h5 className={"alert-heading"}>Impossible de passer commande</h5>
                        <p>Le produit <span className={"fw-bold"}>{productWithoutStock.name}</span> n'a pas assez de stock pour honorer la commande.</p>
                        <p>Veuillez réduire la quantité demandée pour ce produit.</p>
                    </div>
                </FlashMessage>
            )}
            <div className={"col"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <h5>Livraison</h5>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-2"}>
                        <div className="form-check">
                            <input className={"form-check-input"} type="radio" name="civility" value={"mister"}
                                   id="mister_civility" defaultChecked={true} required/>
                                <label className="form-check-label" htmlFor="mister_civility">
                                    M.
                                </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="civility" value={"miss"}
                                   id="miss_civility" required/>
                                <label className="form-check-label" htmlFor="miss_civility">
                                    Mme.
                                </label>
                        </div>
                    </div>
                    <div className={"col-5"}>
                        <input type="text" className="form-control" placeholder="Prénom" name="firstname" required/>
                    </div>
                    <div className={"col-5"}>
                        <input type="text" className="form-control" placeholder="Nom de famille" name="lastname" required/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <input type="email" className="form-control" placeholder="Email" name="email" required/>
                    </div>
                </div>
                <div className={"row mt-5"}>
                    <div className={"col-12"}>
                        <input type="text" className="form-control" placeholder="Rue" name="street" required/>
                    </div>
                </div>
                <div className={"row mt-1"}>
                    <div className={"col-4"}>
                        <input type="text" className="form-control" placeholder="Code Postal" name="postalcode" required/>
                    </div>
                    <div className={"col-4"}>
                        <input type="text" className="form-control" placeholder="Ville" name="town" required/>
                    </div>
                    <div className={"col-4"}>
                        <input type="text" className="form-control" placeholder="Pays" name="country" required/>
                    </div>
                </div>
            </div>
            <div className={"col"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <h5>Paiement</h5>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col"}>
                        <input type="text" className="form-control" placeholder="Pays" name="cardnumber" required/>
                    </div>
                </div>
                <div className={"row mt-1"}>
                    <div className={"col"}>
                        <input type="text" className="form-control" placeholder="Titulaire" name="incumbent" required/>
                    </div>
                </div>
                <div className={"row mt-1"}>
                    <div className={"col-6"}>
                        <input type="text" className="form-control" placeholder="Date d'expiration" name="expiration_date" required/>
                    </div>
                    <div className={"col-4"}>
                        <input type="text" className="form-control" placeholder="CVC" name="cvc" required/>
                    </div>
                </div>
                <div className={"row mt-5"}>
                    <div className={"col"}>
                        <div className={"position-relative"}>
                            <div className={"position-absolute top-0 end-0"}>
                                <input
                                    type={"submit"}
                                    value={"Valider"}
                                    className={"btn btn-success"}
                                />
                            </div>
                            <div>
                                Total: {location.state.total}€
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
}

export default CheckoutDetails;