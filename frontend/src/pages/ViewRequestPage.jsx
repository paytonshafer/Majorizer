//This is the page where a advisor can see student request and aprove/deny them and leave a comment
import React,{useState} from 'react'
import './styles/ViewRequestPage.css'

const ViewRequestPage = () => {
    const[isVisible, setIsVisible] = useState(true)
    const[classes, /*setClasses*/] = useState(["CS 241", "CS 141", "PY 253", "CS 142", "PY 151"])
    const[studentName, /*setStudentName*/] = useState('student1')
  
  
    /*function removeRequest(){
        document.getElementById("requestform").style.display = "none";
        document.getElementById("icon").style.display = "none";
    }*/

    function handleSubmit(e){
        if(window.confirm("Are you sure?")){
            setIsVisible(false);
            if(e.target.name === 'approve'){
                alert(JSON.stringify({'student': document.getElementById('stud').innerHTML, 'result': e.target.name}))
            }else {
                alert(JSON.stringify({'student': document.getElementById('stud').innerHTML, 'result': e.target.name}))
            }
        }
    }

    function BuildPage(){
        return(
            <div>
                <h1>Current Requests</h1>
                <div className='positionbox'>
                <img className='icon' id='icon' src='https://cdn-icons-png.flaticon.com/512/3781/3781605.png' alt='requests'></img>
                </div>
                <div className='fields' id='requestform'>
                    <p id='stud' className='header'>{studentName}</p>
                    <table className='courses'>
                        <tbody>
                            <tr>
                                <th>Current Courses:</th>
                                <th>Already Taken:</th>
                            </tr>
                            <tr>
                                <td>{classes[0]}</td>
                                <td>{classes[1]}</td>
                            </tr>
                            <tr>
                                <td>{classes[2]}</td>
                                <td>{classes[3]}</td>
                            </tr>
                            <tr>
                                <td>{classes[4]}</td>
                                <td>{classes[5]}</td>
                            </tr>
                        </tbody>
                        
                    </table>
                    <p className='header'>Subject: Drop Class</p>
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

    return(
        <div>
            {isVisible ? <BuildPage/> : null}
        </div>
    );
}

export default ViewRequestPage;