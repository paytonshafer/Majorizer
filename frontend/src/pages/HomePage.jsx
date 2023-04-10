//This is the code for our home page
import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../context/AuthContext.js'
import './styles/HomePage.css'

const StudHome = () =>{
    let {user} = useContext(AuthContext)
    let [studData, setStudData] = useState([])

    useEffect(()=>{
        let getStudData = async () => {
            //Here we fetch from our api with the username and password to return our auth tokens
            let response = await fetch('http://127.0.0.1:8000/api/student/' + user.id, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            let data = await response.json() //This should get the auth tokens if successful
    
            if(response.status === 200){ //if response is all good
                setStudData(data) //set auth tokens
                localStorage.setItem('loggedin_stud_data', JSON.stringify(data)) //put the auth tokens in local storage
            }else{alert('Something went wrong')}
        }
        getStudData()
    },[user.id])

    return(
        <div>
            {studData.map((studData) => 
                <div>
                    <h2>Current Major(s) and Minor(s)</h2>
                    <h3>Major1: {studData.major1 ? studData.major1.name : 'NONE'}</h3>
                    <h3>Major2: {studData.major2 ? studData.major2.name : 'NONE'}</h3>
                    <h3>Minor1: {studData.minor1 ? studData.minor1.name : 'NONE'}</h3>
                    <h3>Minor2: {studData.minor2 ? studData.minor2.name : 'NONE'}</h3>
                </div>
            )}
        </div>
    )
}



const AdvHome = () =>{
    let {user} = useContext(AuthContext)
    let [connections, setConnetions]= useState([])

    useEffect(()=>{
        let getStuds = async () => {
            //Here we fetch from our api with the username and password to return our auth tokens
            let response = await fetch('http://127.0.0.1:8000/api/advconn/' + user.id, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            let data = await response.json() //This should get the auth tokens if successful
    
            if(response.status === 200){ //if response is all good
                setConnetions(data) //set auth tokens
                localStorage.setItem('advconnections', JSON.stringify(data)) //put the auth tokens in local storage
            }else{alert('Something went wrong')}
        }
        getStuds()
    },[user.id])
    
    return(
    <div>
       <div className='studentList'>
            <h1 className='studentListHeader'>Students you are Advising:</h1>
            {connections.map((conn) => 
                <li key={conn.id}>
                <p className='studentName'>{conn.student.student.username}</p>
                <p className='studMajorAndYear'>Major1: {conn.student.major1 ? conn.student.major1.name : 'NONE'}</p>
                <p className='studMajorAndYear'>Major2: {conn.student.major2 ? conn.student.major2.name : 'NONE'}</p>
                <p className='studMajorAndYear'>Minor1: {conn.student.minor1 ? conn.student.minor1.name : 'NONE'}</p>
                <p className='studMajorAndYear'>Minor2: {conn.student.minor2 ? conn.student.minor2.name : 'NONE'}</p>
                </li>
            )}
        </div>
    </div>
    )
}

const AdmHome = () =>{
    return(
        <div className='activeRequestField'>
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