//This is the page where a advisor can see student request and aprove/deny them and leave a comment
import React,{useState, useEffect} from 'react'
import './styles/ViewRequestPage.css'

const ViewRequestPage = () => {
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
    
       
    const ApproveDenyButtons = () => {
        let [isVisible, setVisible] = useState(true)
        let [submitted, setSubmitted] = useState(null)
        function handleSubmit(e){
            if(window.confirm("Are you sure?")){
                if(e.target.name === 'approve'){
                    alert(JSON.stringify({'student': document.getElementById('stud').innerHTML, 'result': e.target.name}))
                    setSubmitted("approve")
                }else{
                    alert(JSON.stringify({'student': document.getElementById('stud').innerHTML, 'result': e.target.name}))
                    setSubmitted("deny")
                }
                setVisible(false)
            }
        }
        return(
            <div>
                <button name='approve' onClick={(e) => handleSubmit(e)} style={isVisible ? {display: 'inline'} : {display: 'none'}}>Approve</button>
                <button name='deny' onClick={(e) => handleSubmit(e)} style={isVisible ? {display: 'inline'} : {display: 'none'}}>Deny</button>
                {submitted !== null ? 
                (submitted === 'approve' ? <p style={{color: "green"}}><b>Approved</b></p> : (submitted === 'deny' ? <p style={{color: "red"}}><b>Denied</b></p> : null)) : null
                }
            </div>
        )
    }
    function BuildPage(){
        return(
            <div>
                {console.log(requestList)}
                <h1>Current Requests</h1>
                <div className='positionbox'>
                <img className='icon' id='icon' src='https://cdn-icons-png.flaticon.com/512/3781/3781605.png' alt='requests'></img>
                </div>
                {requestList.map(requestlist => (
                    requestlist.map(request => (
                        <div className='fields' id='requestform'>
                            <h1 id='stud' className='header'>{request.adv_stud.student.student.username}</h1>
                            <h2 className='header'>Subject: {request.subject}</h2>
                            <h2 className='header'>Request:</h2>
                            <p>{request.data}</p>
                            <ApproveDenyButtons/>
                        </div>
                ))))}
            </div>
        )
    }

    return(
        <div>
            <BuildPage/>
        </div>
    );
    }

export default ViewRequestPage;