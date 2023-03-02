//This is the code for our home page
import React, {useContext} from 'react'
import {useResolvedPath} from 'react-router-dom'
import AuthContext from '../context/AuthContext.js'
import './styles/HomePage.css'


const StudHome = () =>{
    return(
    <div>
        hello there
    </div>)
}

const AdvHome = () =>{
    return(
    <div>
       hello there
    </div>)
}

const AdmHome = () =>{
    return(
    <div>
        hello there
    </div>)
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