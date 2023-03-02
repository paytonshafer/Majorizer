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
            </div>
            <p className='fields'>
                Student1
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
            </p>
        </div>
    )
}

export default ViewRequestPage;