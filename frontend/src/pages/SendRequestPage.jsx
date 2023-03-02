//This is the page where a student can send a request to their advisor
import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext.js'
import './styles/SendRequestPage.css'
const SendRequestPage = () => {
    let {user} = useContext(AuthContext);
    //Replace Advisor1in subheader with actual Advisor once data is stored
    return (
        <div>
            <div className='borderbox'>
            <h1 className='username'>What would you like to request, {user.username}?</h1>
            <h2 className='subheader'> Current Advisor: Advisor1 </h2>
            <form>
            <input type='text' className='subject' placeholder='Subject'></input>
            <textarea placeholder="enter your message here..."></textarea>
            <input type='submit' value='Send' onClick={() => {window.confirm('Are you okay with this message?')} }></input>
            </form>
            </div>
        </div>
    )
}

export default SendRequestPage;