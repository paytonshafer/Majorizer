import AuthContext from '../context/AuthContext';
import React, { useContext } from 'react';
import './styles/ViewSchedulePage.css'
//student view schedule page
class ScheduleForm extends React.Component
{
    constructor(props){
        super(props);
        this.state = {value: 'Schedule 1'}

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        }
        handleChange(event){
            this.setState({value: event.target.value});
        }
        handleSubmit(event){
            alert("You chose " + this.state.value);
            event.preventDefault();
        }
        render(){
            return(
                <form onSubmit={this.handleSubmit}>
                <label>
                  <h2>Choose a schedule:</h2>
                  <select value={this.state.value} onChange={this.handleChange}>
                    <option value="S1">Schedule 1</option>
                    <option value="S2">Schedule 2</option>
                    <option value="S3">Schedule 3</option>
                    <option value="S4">Schedule 4</option>
                    <option value="S5">Schedule 5</option>
                    <option value="S6">Schedule 6</option>
                    <option value="S7">Schedule 7</option>
                    <option value="S8">Schedule 8</option>
                  </select>
                </label>
                <input id='selectbutton' type="submit" value="Select" />
              </form>
            );
        }
    }

const StudView = () => {
    return (
    <div className='borderbox'>
    <h1>Welcome to the Schedule Viewer</h1>
    <ScheduleForm></ScheduleForm>
    </div>
    )
}

//advisor view schedule page
const AdvView = () => {
    return (<p>This is the advisor schedule viewer</p>)
}

const ViewSchedulePage = () => {
    let {user} = useContext(AuthContext)

    return (
        <div>
            {user.group === 'student' ? <StudView /> :
             user.group === 'advisor' ? <AdvView /> :
             <p>I am not sure who you are!</p>}
        </div>
    )
}

export default ViewSchedulePage;