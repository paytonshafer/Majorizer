//This is the page where a advisor can see student request and aprove/deny them and leave a comment
import React,{useState, useEffect} from 'react'
import './styles/ViewRequestPage.css'

const ViewRequestPage = () => {
    let [connections, ] = useState(()=> localStorage.getItem('advconnections') ? JSON.parse(localStorage.getItem('advconnections')) : null)
    let [requestList, setRequestList] = useState([])
    const [visible, setVisible] = useState(true);
    
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
    
       
            
    function handleSubmit(e, id){
        if(window.confirm("Are you sure?")){
            if(e.target.name === 'approve'){
                setVisible(!visible)
                let buttons = document.getElementsByClassName('approvedeny' + id);
                for(let i = 0; i < buttons.length; i++){
                    console.log(buttons[i])
                    buttons[i].setAttribute("style", "display: none")
                    console.log(buttons[i])
                }
            }else{
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
                {requestList.map(requestlist => (
                    requestlist.map(request => (
                        <div className='fields' id='requestform'>
                            <p id='stud' className='header'>{request.adv_stud.student.student.username}</p>
                            <p className='header'>Subject: {request.subject}</p>
                            <p className='header'>Request:</p>
                            <p>{request.data}</p>
                            <button className={'approvedeny' + request.id} name='approve' onClick={(e) => handleSubmit(e, request.id)}>Approve</button>
                            <button className={'approvedeny' + request.id} name='deny' onClick={(e) => handleSubmit(e, request.id)}>Deny</button>
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