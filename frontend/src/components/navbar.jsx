//This file will contain the navbar for our webpage
import { useRef, useContext } from "react";
import {FaBars, FaTimes} from "react-icons/fa";
import AuthContext from '../context/AuthContext.js';
import "./styles/navbar.css"

const StudNavBar = () => {
    let {logoutUser} = useContext(AuthContext)
    return (<div>
                <a href="/home">Home</a>
                <a href="/build">Build Schedule</a>
                <a href="/view">Veiw Schedule</a>
                <a href="/sendreq">Send Request</a>
                <a href="/help">Help</a>
                <a href="/" onClick={logoutUser} >Logout</a>
            </div>)

}

const AdvNavBar = () => {
    let {logoutUser} = useContext(AuthContext)
    return (<div>
                <a href="/home">Home</a>
                <a href="/build">Build Schedule</a>
                <a href="/view">Veiw Schedule</a>
                <a href="/viewreq">Veiw Request</a>
                <a href="/help">Help</a>
                <a href="/" onClick={logoutUser} >Logout</a>
            </div>)
}

const AdmNavBar = () => {
    let {logoutUser} = useContext(AuthContext)
    return (<div>
                <a href="/home">Home</a>
                <a href="/connection">Manage Connections</a>
                <a href="/help">Help</a>
                <a href="/" onClick={logoutUser} >Logout</a>
            </div>)
}

const Navbar = () => {
    const navRef = useRef();
    let {user} = useContext(AuthContext)

    const showNavBar = () =>  {
        navRef.current.classList.toggle("responsive_nav");
    }
    
    return (
        <header>
            <h3>Majorizer</h3>
            <nav ref={navRef}>
                {user === null ? (<h3>WELCOME!</h3>) :
                user.group === 'student' ? (<StudNavBar />) :
                user.group === 'advisor' ? (<AdvNavBar />) :
                user.group === 'admin' ? (<AdmNavBar />) : 
                null}
                <button className="nav-btn nav-close-btn" onClick={showNavBar}>
                    <FaTimes>
                    </FaTimes>
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavBar}>
                <FaBars></FaBars>
            </button>
            {/*<a href="https://webspace.clarkson.edu/classes/softwaresurge/public_html/">SOFTWARE SURGE</a> add in eventually to link to team website*/}
        </header>
    )
    
}

export default Navbar;