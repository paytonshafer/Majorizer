//This is the page where a student can send a request to their advisor
import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext.js'
import StaticData from '../context/StaticData.js';
import './styles/SendRequestPage.css'
const SendRequestPage = () => {
    let {user} = useContext(AuthContext);
    let {advisor_connections} = useContext(StaticData); //get advisor stud connecions for static data
    //Replace Advisor1in subheader with actual Advisor once data is stored
    return (
        <div>
            <div className='borderbox'>
            <h1 className='username'>What would you like to request, {user.username}?</h1>
            <h2 className='subheader'> Current Advisor(s): {advisor_connections.map((connection) => connection.stud === user.username ? (connection.adv + ' ') : null)} </h2> {/*This gets the advisor for our current student */}
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