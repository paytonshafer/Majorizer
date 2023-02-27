//This file will contain the navbar for our webpage
import { useRef } from "react";
import {FaBars, FaTimes} from "react-icons/fa";
import "./styles/navbar.css"

const Navbar = () => {
    const navRef = useRef();

    const showNavBar = () =>  {
        navRef.current.classList.toggle("responsive_nav");
    }
    return (
        <header>
            <h3>Majorizer</h3>
            <nav ref={navRef}>
                <a href="/#">Home</a>
                <a href="/#">Login</a>
                <button className="nav-btn nav-close-btn" onClick={showNavBar}>
                    <FaTimes>
                    </FaTimes>
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavBar}>
                <FaBars>
                </FaBars>
            </button>
        </header>
    )
}

export default Navbar;