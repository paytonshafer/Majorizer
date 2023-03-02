//This is the code for our home page
import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext.js'
import './styles/HomePage.css'

//Adding a comment to build
const StudHome = () =>{
    return(<div>Hello student!</div>)
}

const AdvHome = () =>{
    return(<div>Hello advisor!</div>)
}

const AdmHome = () =>{
    return(<div>Hello admin!</div>)
}

const HomePage = () => {
    let {user} = useContext(AuthContext)

    return (
        <div>
            <p className='welcomeField'>Hello {user.username} you are a {user.group}</p>
            {/*The below block checks for a user and renders the correct nave bar based on who is logged in*/
            user === null ? (<h3>WELCOME!</h3>) :
            user.group === 'student' ? (<StudHome />) :
            user.group === 'advisor' ? (<AdvHome />) :
            user.group === 'admin' ? (<AdmHome />) : 
            null}
            
        </div>
    )
}

export default HomePage;