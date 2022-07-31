import {Link} from "react-router-dom";
import Cookies from 'js-cookie';

function NavBar() {
    const cartId = Cookies.get('cart_id');

    return <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container-fluid">
            <Link to={"/"} className={"navbar-brand"}>Panopli</Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <Link to={"/carts/" + cartId} className={"nav-link display-6"}>Panier</Link>
            </ul>
        </div>
    </nav>
}

export default NavBar;