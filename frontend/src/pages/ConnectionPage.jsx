//This is the page where the admin can manage the advisor student connections
import React, {useContext, useState, useEffect} from 'react'
import AuthContext from '../context/AuthContext.js'
import './styles/ConnectionPage.css'
/*right now the connections are static hard coded. Later, we can make the connection component into a function and
have multiple appear. We can also then track each individually by an id and actually let the connectees know if
the connection was approved or denied */


const PairingForm = () =>{
    let [connections, setConnections] = useState()

    useEffect(()=>{
        let getStudData = async () => {
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
        getStudData()
    },[])

    let [advSelect, setAdvSelect] = useState('None')
    let [studSelect, setStudSelect] = useState('None')



    let updateConnections = async (stud, adv) =>{
        if( advSelect === '' || studSelect === '' || advSelect === 'None' || studSelect === 'None'){
            window.alert("Please Select an advisor and a student")
        }else{
            window.alert("Created connection between " + JSON.stringify(advSelect) + " and " + JSON.stringify(studSelect))
        }
    }

    return(
        <div>
            <h3> Change Student/Advisor Pairings:</h3>
            <label htmlFor='advselect'>Advisor:</label>
         <select 
         onChange={(e) => {setAdvSelect(e.target.value)}} id = 'advselect'
         >
            <option value="None"></option>
            <option value="Advisor1">Advisor1</option>
            <option value="Advisor2">Advisor2</option>
          </select>
          <label htmlFor='stuselect'>Student</label>
         <select 
         onChange={(e) => {setStudSelect(e.target.value)}} id = 'stuselect'
         >
            <option value="None"></option>
            <option value="Student1">Student1</option>
            <option value="Student2">Student2</option>
          </select>
          <h4>Make pair student, advisor? </h4>
          <button className = 'confirm' onClick={updateConnections}>Confirm</button>
          <h3> List of Current Student/Advisor Connections:</h3>
            <table>
                <tr>
                    <th>Advisor Name</th>
                    <th>Assigned Student(s)</th>
                </tr>
                {/*here is where connection table will go */}
                <tr>
                    <td>Advisor1</td>
                    <td>
                        student1
                    </td>
                </tr>
                <tr>
                    <td>Advisor2</td>
                    <td>student 2
                    </td>
                </tr>
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
