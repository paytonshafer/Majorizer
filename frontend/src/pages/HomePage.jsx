//This is the code for our home page
import React, {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
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
       <p className='courseListHeader'>Your current courses:</p>
        <p className='course1'>CS350: Software Design & Development</p>
            <p className='course1Time'>TTh 1:30-2:45</p>
            <p className='course1Location'>Snell 213</p>
        <p className='course2'>CS459: Human-Computer Interaction</p>
            <p className='course2Time'>TTh 4:30-5:45</p>
            <p className='course2Location'>Science Center 348</p>
    </div>)
}

const AdmHome = () =>{
    return(
    <div>
        <p className='activeRequestField'>You have 2 active requests!</p>
    </div>)
}
//this will be edited to link with backend stuff later on, hardcoding in 2 for rn

const HomePage = () => {
    let {user} = useContext(AuthContext)

    return (
        <div>
            <p className='welcomeField'>Hello {user.username}: {user.group} account</p>
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