//This is the page where a student can send a request to their advisor
import React, {useContext, useState, useEffect} from 'react'
import AuthContext from '../context/AuthContext.js'
//import StaticData from '../context/StaticData.js';
import './styles/SendRequestPage.css'
const SendRequestPage = () => {
    let {user} = useContext(AuthContext);
    let [adv, setAdv] = useState();
    //let {advisor_connections} = useContext(StaticData); //get advisor stud connecions for static data
    //Replace Advisor1in subheader with actual Advisor once data is stored
    useEffect(()=>{
        let getAdv = async () => {
            //Here we fetch from our api with the username and password to return our auth tokens
            let response = await fetch('http://127.0.0.1:8000/api/studconn/' + user.id, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            let data = await response.json() //This should get the auth tokens if successful
    
            if(response.status === 200){ //if response is all good
                setAdv(data) //set auth tokens
                localStorage.setItem('advconn', JSON.stringify(data)) //put the auth tokens in local storage
            }else{alert('Something went wrong')}
        }
        getAdv()
    },[user.id])

    const send_req = async (e) =>{
        if(e.target.subject.value === '' || e.target.data.value === ''){
            alert('Please input both a subject and a message')
        }else{
            let postdata = JSON.stringify({'subject': e.target.subject.value, 'data': e.target.data.value, 'conn': adv.id})
            await fetch('http://127.0.0.1:8000/api/request/', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: postdata
            })
        }   
    }

    return (
        <div>
            <div className='borderbox'>
            <h1 className='username'>What would you like to request, {user.username}?</h1>
            <h2 className='subheader'> Current Advisor: {adv ? adv.advisor.username : null}</h2> 
            {/*on submit they will be asked if they are sure then we get an alert of the data that would be sent to the backend */}
            <form onSubmit={(e) => window.confirm("Are you sure you want to send this message?").then(send_req(e))}> 
                <input type='text' name='subject' className='subjectbox' placeholder='Subject'></input>
                <textarea name='data' className='responsebox' placeholder="enter your message here..."></textarea>
                <input type='submit' value='Submit'></input>
            </form>
            </div>
        </div>
    )
}

export default SendRequestPage;