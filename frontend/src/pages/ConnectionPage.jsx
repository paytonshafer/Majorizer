//This is the page where the admin can manage the advisor student connections
import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext.js'
import './styles/ConnectionPage.css'
/*right now the connections are static hard coded. Later, we can make the connection component into a function and
have multiple appear. We can also then track each individually by an id and actually let the connectees know if
the connection was approved or denied */
class PairingForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {advisor: 'Advisor1', student: 'Student1', adv1conns: ["Student1","Student3"], adv2conns: ["Student2"]}
        this.handleChangeAdv = this.handleChangeAdv.bind(this);
        this.handleChangeStu = this.handleChangeStu.bind(this);
    }
    handleChangeAdv(e){
        this.setState({advisor:e.target.value});
    }
    handleChangeStu(e){
        /*var newAdv = e.target.value;*/
        this.setState({student:e.target.value});
    }
    updatePairings(e){
        /*right now this function does nothing but tell user pair has been updated. In future, will update pair in backend*/
        alert(JSON.stringify({advisor: e, student: e}));
    }
    render() {
        var student=this.state.student;
        var advisor=this.state.advisor;
        return (
        <div>
            <h3> Change Student/Advisor Pairings:</h3>
            <label htmlFor='advselect'>Advisor:</label>
         <select 
         defaultValue={this.state.advisor} 
         onChange={this.handleChangeAdv} id = 'advselect'
         >
            <option value="Advisor1">Advisor1</option>
            <option value="Advisor2">Advisor2</option>
          </select>
          <label htmlFor='stuselect'>Student</label>
         <select 
         defaultValue={this.state.student} 
         onChange={this.handleChangeStu} id = 'stuselect'
         >
            <option value="Student1">Student1</option>
            <option value="Student2">Student2</option>
          </select>
          <h4>Make pair {student}, {advisor}? </h4>
          <button classname = 'confirm' onClick={() => (window.alert("Created connection between " + JSON.stringify(advisor) + " and " + JSON.stringify(student)))}>Confirm</button>
          <h3> List of Current Student/Advisor Connections:</h3>
            <table>
                <tr>
                    <th>Advisor Name</th>
                    <th>Assigned Student(s)</th>
                </tr>
                <tr>
                    <td>Advisor1</td>
                    <td>
                        {this.state.adv1conns.map(name => (
                            <p>{name}</p>
                        ))}
                    </td>
                </tr>
                <tr>
                    <td>Advisor2</td>
                    <td>{
                    this.state.adv2conns.map(name => (
                            <p>{name}</p>
                        ))}
                    </td>
                </tr>
            </table>
          </div>        
        );
    }
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
