//This is the page where the admin can manage the advisor student connections
import React, {useContext, useState, useEffect} from 'react'
import AuthContext from '../context/AuthContext.js'
import './styles/ConnectionPage.css'
/*right now the connections are static hard coded. Later, we can make the connection component into a function and
have multiple appear. We can also then track each individually by an id and actually let the connectees know if
the connection was approved or denied */


const PairingForm = () =>{
    let [connections, setConnections] = useState()

    const refreshPage = () => {
        setTimeout(() => {
            window.location.reload(false);
          }, 1000);
    }

    //PUT call goes here, then refresh the connections
    let updateConnections = () =>{
        if( advSelect === '' || studSelect === '' || advSelect === 'None' || studSelect === 'None'){
            window.alert("Please Select an advisor and a student")
        }else{
            let stud_id = studSelect 
            let adv_id = advSelect
            
            fetch('http://127.0.0.1:8000/api/studconn/' + stud_id, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"advisor": adv_id})
        }).then(refreshPage)
        console.log(JSON.stringify({"advisor": adv_id}))
        }
    }

    useEffect(()=>{
        let getConnections = async () => {
            //Here we fetch from our api with the username and password to return our auth tokens
            let response = await fetch('http://127.0.0.1:8000/api/advstudconn/', {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            let data = await response.json() //This should get the auth tokens if successful
    
            if(response.status === 200){ //if response is all good
                setConnections(data) //set connections
                localStorage.setItem('AdminsConnections', JSON.stringify(data)) //put the connections in local storage
            }else{alert('Something went wrong')}
        }
        getConnections()
    },[])

    let [advSelect, setAdvSelect] = useState('None')
    let [studSelect, setStudSelect] = useState('None')

    return(
        <div>
            <h3> Change Student/Advisor Pairings:</h3>
            <label htmlFor='advselect'>Advisor:</label>
         <select 
         onChange={(e) => {setAdvSelect(e.target.value)}} id = 'advselect'
         >
            <option value="None"></option>
            <option value={4}>Advisor1</option>
            <option value={5}>Advisor2</option>
          </select>
          <label htmlFor='stuselect'>Student:</label>
         <select 
         onChange={(e) => {setStudSelect(e.target.value)}} id = 'stuselect'
         >
            <option value="None"></option>
            {connections ? connections.map((conn) => 
                        <option key={conn.id} value={conn.student.student.id}>{conn.student.student.username}</option>
                    ): null}
          </select>
          <h4>Make pair student, advisor? </h4>
          <button className = 'confirm' onClick={updateConnections}>Confirm</button>
          <h3> List of Current Student/Advisor Connections:</h3>
            <table>
                <thead>
                    <tr>
                        <th>Advisor Name</th>
                        <th>Assigned Student</th>
                    </tr>
                </thead>
                
                {/*here is where connection table will go */}
                <tbody>
                    {connections ? connections.map((conn) => 
                        <tr key={conn.id}>
                            <td>{conn ? conn.advisor.username : null}</td>
                            <td>{conn ?conn.student.student.username : null}</td>
                        </tr>
                    ): null}
                </tbody>
                
                {/*to here */}
            </table>
          </div>    
    )
}

const ConnectionPage = () => {
    let {user} = useContext(AuthContext);
    /*function removeConnection(){
        document.getElementById("connection-1").style.display = "none";
        
    }*/
    return (
        <div>
            <div className='borderbox-2'>
            <h1>Welcome, {user.username}.</h1>
            <PairingForm></PairingForm>
            </div>
        </div>
    )
}

export default ConnectionPage;
