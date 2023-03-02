//This is the page where a advisor can see student request and aprove/deny them and leave a comment
import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext.js'
import './styles/ViewRequestPage.css'
const ViewRequestPage = () => {
    //Currently schedule table data is hardcoded, later we should use data linked to user to fill this in
    return (
        <div>
            <h1>Current Requests</h1>
            <div className='positionbox'>
            <img className='icon' src='https://cdn-icons-png.flaticon.com/512/3781/3781605.png' alt='requests'></img>
            <span className='badge'>1</span>
            </div>
            <p className='fields'>
                <p className='header'>Student1</p>
                <table className='courses'>
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
                </table>
                <p className='header'>Request:</p>
                <p>I would like to drop PY 255.
                    I want to wait to take it until I've finished PY 253, 
                    since doubling up is an enormous workload for me.
                </p>
                <button className='approvedeny' onClick={ () => window.confirm('Are you sure you want to approve this request?')}>Approve</button>
                <button className='approvedeny' onClick={ () => window.confirm('Are you sure you want to deny this request?')}>Deny</button>
            </p>
        </div>
    )
}

export default ViewRequestPage;