//This is the page where the admin can manage the advisor student connections
import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext.js'
import './styles/ConnectionPage.css'
/*right now the connections are static hard coded. Later, we can make the connection component into a function and
have multiple appear. We can also then track each individually by an id and actually let the connectees know if
the connection was approved or denied */
const ConnectionPage = () => {
    let {user} = useContext(AuthContext);
    function removeConnection(){
        document.getElementById("connection-1").style.display = "none";
        
    }
    
    function handleConfirm(){
        if(window.confirm("Are you sure?")){
            removeConnection();    
        }
    }
    return (
        <div>
            <div className='borderbox-2'>
            <h1>Welcome, {user.username}. Confirm connections below.</h1>
            <div id = "connection-1" className='connection'>
                <div className='connection-header'>
                <p>Admin: Admin1</p>
                <p>Student: Student1</p>
                </div>
                <div className='text'>
                <p className='text'><b>Request:</b> I would like to drop PY 255.
                    I want to wait to take it until I've finished PY 253, 
                    since doubling up is an enormous workload for me. </p>
                    </div>
                <p><b>Advisor Status:</b> <i>APPROVED</i></p>
                <button className='confirm' onClick={handleConfirm}>Allow</button>
                <button className='cancel'onClick={handleConfirm}>Reject</button>
            </div>
            </div>
        </div>
    )
}

export default ConnectionPage;
