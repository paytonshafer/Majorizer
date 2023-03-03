//This is the code for our home page
import React, {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../context/AuthContext.js'
import './styles/HomePage.css'


const Adv1Display = () =>{
    return (
        <div className='courseBlock'>
            <p className='courseListHeader'>Your current courses:</p>
        <p className='course1'>CS350: Software Design & Development</p>
            <p className='course1Time'>TTh 1:30-2:45</p>
            <p className='course1Location'>Snell 213</p>
        <p className='course2'>CS459: Human-Computer Interaction</p>
            <p className='course2Time'>TTh 4:30-5:45</p>
            <p className='course2Location'>Science Center 348</p>
        </div>
    )
}

const Adv2Display = () =>{
    return (
        <div>
            <p className='courseListHeader'>Your current courses:</p>
        <p className='course1'>PY151: Introduction to Psychology</p>
            <p className='course1Time'>MWF 9:00-9:50</p>
            <p className='course1Location'>Science Center 362</p>
        <p className='course2'>PY253 Social Psychology</p>
            <p className='course2Time'>MWF 1:00-1:50</p>
            <p className='course2Location'>Snell 212</p>
        </div>
    )
}


const StudHome = () =>{
    return(
    <div>
        hello there
    </div>)
}

const AdvHome = () =>{
    let {user} = useContext(AuthContext)
    
    return(
    <div>
       {/*The below block checks for a user and renders the correct nave bar based on who is logged in*/
            user === null ? (<h3>You are not an advisor and something has gone wrong</h3>) :
            user.username === 'advisor1' ? (<Adv1Display />) :
            user.username === 'advisor2' ? (<Adv2Display />) :
            null}
    </div>
    )
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