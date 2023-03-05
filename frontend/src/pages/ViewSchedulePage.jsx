import AuthContext from '../context/AuthContext';
import React, { useContext } from 'react';
import './styles/ViewSchedulePage.css'
//student view schedule page
window.$mwf1='CS141';
window.$mwf2='MA131';
window.$mwf3='';
window.$tt1= 'PY151';
window.$tt2= '';
window.$tt3 = "PY153";
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
            if (this.state.value === 'S1') {
                window.$mwf1='CS141';
                window.$mwf2='MA131';
                window.$mwf3='';
                window.$tt1= 'PY151';
                window.$tt2= '';
                window.$tt3 = "PY153";
            }
            if (this.state.value === 'S2') {
                window.$mwf1 = 'CS241';
                window.$mwf2 = '';
                window.$mwf3='MA132';
                window.$tt1 = 'PY153';
                window.$tt2 = 'PY155';
                window.$tt3 = "CS242";
            }
            this.setState({value: event.target.value});
            
            event.preventDefault();
        }
        render(){return(
                <div>
                <form onSubmit={this.handleSubmit}>
                <label>
                  <h2>Choose a schedule:</h2>
                  <select id = 'selection' value={this.state.value} onChange={this.handleChange}>
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
              <table className='schedule'>
                    <tbody>
                    <tr>
                        <th>Mon</th>
                        <th>Tues</th>
                        <th>Wed</th>
                        <th>Thurs</th>
                        <th>Fri</th>
                    </tr>
                    <tr>
                        <td>{window.$mwf1}</td>
                        <td>{window.$tt1}</td>
                        <td>{window.$mwf1}</td>
                        <td>{window.$tt1}</td>
                        <td>{window.$mwf1}</td>
                    </tr>
                    <tr>
                        <td>{window.$mwf2}</td>
                        <td>{window.$tt2}</td>
                        <td>{window.$mwf2}</td>
                        <td>{window.$tt2}</td>
                        <td>{window.$mwf2}</td>
                    </tr>
                    <tr>
                        <td>{window.$mwf3}</td>
                        <td>{window.$tt3}</td>
                        <td>{window.$mwf3}</td>
                        <td>{window.$tt3}</td>
                        <td>{window.$mwf3}</td>
                    </tr>
                    </tbody>
                </table>
   
              </div>
            );
        }
    }

const StudView = () => {
    return (
    <div className='borderbox'>
    <h1>Welcome to the Student Schedule Viewer</h1>
    <ScheduleForm id = 'stuschedule'></ScheduleForm>
    </div>
    )
}

//advisor view schedule page
const AdvView = () => {
    return (
    <div className='borderbox'>
    <h1>Welcome to the Advisor Schedule Viewer</h1>
    <h2> Please see students Schedules Below</h2>
    <ScheduleForm id = 'advschedule'></ScheduleForm>
    </div>
    )
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