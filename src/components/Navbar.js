import { Link } from "react-router-dom";
import { useState } from "react";
import logo from '../img/codesandbox.svg'

export const Navbar = () => {
    const [menu, setMenu] = useState(false)

    const showMenu = () => setMenu(!menu)

    return (
        <>
            <input type="checkbox" id="nav" className="hidden" />
            <label htmlFor="nav" className="nav-mobile-toggle" onClick={showMenu}>
                <i></i>
                <i></i>
                <i></i>
            </label> 
            <nav>
                <Link className="nav-logo" to="/">
                    <img src={logo} alt="" />
                </Link>
                <div className={menu ? "nav-links-container active" : "nav-links-container"} id="nav-mobile">
                    <Link className="nav-link" to="/artists" onClick={showMenu}>ARTISTS</Link>
                    <Link className="nav-link" to="/albums" onClick={showMenu}>RELEASES</Link>
                    <Link className="nav-link" to="/contact" onClick={showMenu}>CONTACT</Link>
                </div>
            </nav>
        </>
    )
};
