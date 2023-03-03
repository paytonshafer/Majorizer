//This is the page where a advisor can see student request and aprove/deny them and leave a comment
import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext.js'
import StaticData from '../context/StaticData.js'
import './styles/ViewRequestPage.css'

const ViewRequestPage = () => {
    let {user } = useContext(AuthContext)
    let {advisor_connections } = useContext(StaticData)

    function removeRequest(){
        document.getElementById("requestform").style.display = "none";
        document.getElementById("badge1").style.display = "none";
    }
    
    function handleSubmit(e){
        if(window.confirm("Are you sure?")){
            removeRequest();
            if(e.target.name === 'approve'){
                alert(JSON.stringify({'student': document.getElementById('stud').innerHTML, 'result': e.target.name}))
            }else {
                alert(JSON.stringify({'student': document.getElementById('stud').innerHTML, 'result': e.target.name}))
            }
        }
    }

    //Currently schedule table data is hardcoded, later we should use data linked to user to fill this in
    return (
        <div>
            <h1>Current Requests</h1>
            <div className='positionbox'>
            <img className='icon' src='https://cdn-icons-png.flaticon.com/512/3781/3781605.png' alt='requests'></img>
            <span className='badge' id='badge1'></span>
            </div>
            <div className='fields' id='requestform'>
                <p id='stud' className='header'>{advisor_connections.map((connection) => connection.adv === user.username ? connection.stud : null)}</p>
                <table className='courses'>
                    <tbody>
                        <tr>
                            <th>Current Courses:</th>
                            <th>Already Taken:</th>
                        </tr>
                        <tr>
                            <td>CS 241</td>
                            <td>CS 141</td>
                        </tr>
                        <tr>
                            <td>PY 253</td>
                            <td>CS 142</td>
                        </tr>
                        <tr>
                            <td>PY 255</td>
                            <td>PY 151</td>
                        </tr>
                    </tbody>
                    
                </table>
                <p className='header'>Request:</p>
                <p>I would like to drop PY 255.
                    I want to wait to take it until I've finished PY 253, 
                    since doubling up is an enormous workload for me.
                </p>
                <button className='approvedeny' name='approve' onClick={(e) => handleSubmit(e)}>Approve</button>
                <button className='approvedeny' name='deny' onClick={(e) => handleSubmit(e)}>Deny</button>
            </div>
        </div>
    )
}

export default ViewRequestPage;