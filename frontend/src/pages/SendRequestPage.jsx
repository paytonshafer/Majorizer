//This is the page where a student can send a request to their advisor
import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext.js'
//import StaticData from '../context/StaticData.js';
import './styles/SendRequestPage.css'
const SendRequestPage = async () => {  //added async here
    let {user} = useContext(AuthContext);
    //let {advisor_connections} = useContext(StaticData); //get advisor stud connecions for static data
    //Replace Advisor1in subheader with actual Advisor once data is stored

//*************************************************
    //GET
    let response = await fetch('http://127.0.0.1:8000/api/studconn/<stud_id>/', { 
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'stud_id':e.target.stud_id.value})
    })
    let data = await response.json()

    if(response.status === 200){ //if response is all good

    }else{alert('Something went wrong')}

    //POST
    let response2 = await fetch('http://127.0.0.1:8000/api/request/', { 
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'subject':e.target.subject.value, 'data':e.target.data.value})
    })
    let data2 = await response.json()

    if(response.status === 200){ //if response is all good

    }else{alert('Something went wrong')}
    //*************************************************

    return (
        <div>
            <div className='borderbox'>
            <h1 className='username'>What would you like to request, {user.username}?</h1>
            <h2 className='subheader'> Current Advisor(s): advisor1{/*advisor_connections.map((connection) => connection.stud === user.username ? (connection.adv + ' ') : null)*/} </h2> {/*This gets the advisor for our current student */}
            {/*on submit they will be asked if they are sure then we get an alert of the data that would be sent to the backend */}
            <form onSubmit={async (e) => (window.confirm('Are you okay with this message?').then(alert(JSON.stringify({'subject': e.target.subject.value, 'text': e.target.data.value }))))}> 
                <input type='text' name='subject' className='subject' placeholder='Subject'></input>
                <textarea name='data' placeholder="enter your message here..."></textarea>
                <input type='submit' value='Send'></input>
            </form>
            </div>
        </div>
    )
}

export default SendRequestPage;


