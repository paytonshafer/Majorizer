//This file will contain the navbar for our webpage
import { useRef, useContext } from 'react';
import {FaBars, FaTimes} from 'react-icons/fa';
import AuthContext from '../context/AuthContext.js';
import './styles/navbar.css'
//The below functions renders the elements in the nav bar for a student
const StudNavBar = () => {
    let {logoutUser} = useContext(AuthContext) //get logout user function from AuthContext
    return (<div>
                <a href="/home">Home</a>
                <a href="/build">Build Schedule</a>
                <a href="/view">View Schedule</a>
                <a href="/sendreq">Send Request</a>
                <a href="/help">Help</a>
                <a href="/" onClick={logoutUser} >Logout</a>
            </div>)
}
//The below function renders the elemenst of the nav bar for an advisor
const AdvNavBar = () => {
    let {logoutUser} = useContext(AuthContext) //get logout user function from AuthContext
    return (<div>
                <a href="/home">Home</a>
                <a href="/build">Build Schedule</a>
                <a href="/view">View Schedule</a>
                <a href="/viewreq">View Request</a>
                <a href="/help">Help</a>
                <a href="/" onClick={logoutUser} >Logout</a>
            </div>)
}
//The below function renders the elements of the nav bar for the admin
const AdmNavBar = () => {
    let {logoutUser} = useContext(AuthContext) //get logout user function from AuthContext
    return (<div>
                <a href="/home">Home</a>
                <a href="/connection">Manage Connections</a>
                <a href="/help">Help</a>
                <a href="/" onClick={logoutUser} >Logout</a>
            </div>)
}
//The below function renders teh nav bar
const Navbar = () => {
    const navRef = useRef(); //idk
    let {user} = useContext(AuthContext) //get user from AuthContext
    /*const showNavBar = () =>  {
        navRef.current.classList.toggle("responsive_nav");
    }*/
    return (
        <header>
            <img className = 'majorizer' src='/majorizer.png' alt='Majorizer'></img>
            <nav ref={navRef}>
                {/*The below block checks for a user and renders the correct nave bar based on who is logged in*/
                user === null ? (<h3>WELCOME!</h3>) :
                user.group === 'student' ? (<StudNavBar />) :
                user.group === 'advisor' ? (<AdvNavBar />) :
                user.group === 'admin' ? (<AdmNavBar />) : 
                null}
                <button className="nav-btn nav-close-btn" /*onClick={showNavBar}*/>
                    <FaTimes>
                    </FaTimes>
                </button>
            </nav>
            <button className="nav-btn" /*onClick={showNavBar}*/> 
                <FaBars></FaBars>
            </button>
            {/*<a href=“https://webspace.clarkson.edu/classes/softwaresurge/public_html/”>SOFTWARE SURGE</a> add in eventually to link to team website*/}
        </header>
    )
}
export default Navbar;