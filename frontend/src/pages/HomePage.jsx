//This is the code for our home page
import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext.js'
import './styles/HomePage.css'
window.$mwf1='CS141';
window.$mwf2='MA131';
window.$mwf3='';
window.$tt1= 'PY151';
window.$tt2= '';
window.$tt3 = "PY153";


const Adv1Display = () =>{
    return (
        <div className='studentList'>
            <h1 className='studentListHeader'>Students you are Advising:</h1>
        <p className='studentName'>John Doe</p>
            <p className='studMajorAndYear'>Computer Science Major, 2023</p>
        <p className='studentName'>Jane Doe</p>
            <p className='studMajorAndYear'>Computer Science Major, Math Minor, 2024</p>
        </div>
        
    )
}

const Adv2Display = () =>{
    return (
        <div className='studentList'>
            <h1 className='studentListHeader'>Students you are Advising:</h1>
        <p className='studentName'>Josh Doe</p>
            <p className='studMajorAndYear'>Psychology Major, 2024</p>
        <p className='studentName'>James Doe</p>
            <p className='studMajorAndYear'>Psychology Major, Math Minor, 2025</p>
        </div>
    )
}

//This is the hardcoded schedule for the students
window.$mwf1='CS141';
            window.$mwf2='MA131';
            window.$mwf3='';
            window.$tt1= 'PY151';
            window.$tt2= '';
            window.$tt3 = "PY153";

const StudHome = () =>{
    return(
    <div>
        <h1>Major(s): Computer Science </h1>
        <h1>Minor(s): N/a</h1>
        <h1>Your Most Recent Schedule: </h1>
        <p className='scheduleSemester'>Fall 2023:</p>
        <table className='schedule'>
                <tbody>
                <tr>
                    <th>Mon</th>
                    <th>Tues</th>
                    <th>Wed</th>
                    <th>Thurs</th>
                    <th>Fri</th>
                </tr>
                <tr>
                    <td>{window.$mwf1}</td>
                    <td>{window.$tt1}</td>
                    <td>{window.$mwf1}</td>
                    <td>{window.$tt1}</td>
                    <td>{window.$mwf1}</td>
                </tr>
                <tr>
                    <td>{window.$mwf2}</td>
                    <td>{window.$tt2}</td>
                    <td>{window.$mwf2}</td>
                    <td>{window.$tt2}</td>
                    <td>{window.$mwf2}</td>
                </tr>
                <tr>
                    <td>{window.$mwf3}</td>
                    <td>{window.$tt3}</td>
                    <td>{window.$mwf3}</td>
                    <td>{window.$tt3}</td>
                    <td>{window.$mwf3}</td>
                </tr>
                </tbody>
            </table>
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
        <div className='activeRequestField'>
        <p>You have 2 active requests!</p>
        </div>
    )
}
//this will be edited to link with backend stuff later on, hardcoding in 2 for rn


const HomePage = () => {
    let {user} = useContext(AuthContext)

    return (
        <div className='borderbox'>
            <div  className='welcomeField'>
            <img className='logo' src="/logo.png" alt='logo'></img>
            <h1 style={{fontWeight: 'bold'}}>Welcome {user.username}</h1>
            <h5>{user.group} account</h5>
            </div>
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