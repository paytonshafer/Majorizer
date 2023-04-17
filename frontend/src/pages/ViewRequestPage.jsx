//This is the page where a advisor can see student request and aprove/deny them and leave a comment
import React,{useState, useEffect} from 'react'
import './styles/ViewRequestPage.css'

const ViewRequestPage = () => {
    const[isVisible, setIsVisible] = useState(true)
    const[classes, /*setClasses*/] = useState(["CS 241", "CS 141", "PY 253", "CS 142", "PY 151"])
    const[studentName, /*setStudentName*/] = useState('student1')
    let [connections, ] = useState(()=> localStorage.getItem('advconnections') ? JSON.parse(localStorage.getItem('advconnections')) : null)
    let [requestList, setRequestList] = useState([])
    
    let students = []
    if(connections){
        connections.map((conn) => (students.push({id: conn.student.student.id, stud: conn.student.student.username, label: conn.student.student.username})))
    }

    useEffect(()=>{
        let studs = []
        if(connections){
            connections.map((conn) => (studs.push({id: conn.student.student.id, stud: conn.student.student.username, label: conn.student.student.username})))
        }
        let requests = async () => {
            let temp = []
            let i=0;
            for(i; i< studs.length; i++){
                console.log(i)
                let response = await fetch('http://127.0.0.1:8000/api/request/' + studs[i].id, {
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                let data = await response.json()
                temp.push(data)
                //console.log(requestList)
            }
            setRequestList(temp)
        }
        requests()
    },[connections])
    //*************************************************

    /*function removeRequest(){
        document.getElementById("requestform").style.display = "none";
        document.getElementById("icon").style.display = "none";
    }*/
    
       
            
    function handleSubmit(e){
        if(window.confirm("Are you sure?")){
            setIsVisible(false);
            console.log(requestList)
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
                {console.log(requestList)}
                <h1>Current Requests</h1>
                <div className='positionbox'>
                <img className='icon' id='icon' src='https://cdn-icons-png.flaticon.com/512/3781/3781605.png' alt='requests'></img>
                </div>
                {requestList.map(request => (
                <div className='fields' id='requestform'>
                    <p id='stud' className='header'>{request.username}</p>
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
                    <p className='header'>Subject: {request.subject}</p>
                    <p className='header'>Request:</p>
                    <p>{request.data}</p>
                    <button className='approvedeny' name='approve' onClick={(e) => handleSubmit(e)}>Approve</button>
                    <button className='approvedeny' name='deny' onClick={(e) => handleSubmit(e)}>Deny</button>
                </div>
                ))}
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