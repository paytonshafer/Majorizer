//This is the code for our Schedule Building Page
import AuthContext from '../context/AuthContext';
import React, { useContext } from 'react';
import './styles/BuildSchedulePage.css'
var firstMajor;
var secondMajor;
var firstMinor;
var secondMinor;
var computerScience = 1;
var psychology = 2;
var literature = 3;
var math = 4;
var none = 5;

class ConstructSchedule extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            major1: 'Major 1 Selection',
            major2: 'Major 2 Selection',
            minor1: 'Minor 1 Selection',
            minor2: 'Minor 2 Selection'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        }
        handleChange(event){
            this.setState({major1: event.target.value, major2: event.target.value, minor1: event.target.value, minor2: event.target.value});
        }
        handleSubmit(event){
            if (this.state.major1 === 'CS') {
                <p>You chose Computer Science</p>
                firstMajor = computerScience;
            }
            if (this.state.major1 === 'PY') {
                <p>You chose Psychology</p>
                firstMajor = psychology;
            }
            if (this.state.major2 === 'CS') {
                <p>You chose Computer Science</p>
                secondMajor = computerScience;
            }
            if (this.state.major2 === 'PY') {
                <p>You chose Psychology</p>
                secondMajor = psychology;
            }
            if (this.state.major2 === 'NA') {
                <p>You chose not to select a second major</p>
                secondMajor = none;
            }
            if (this.state.minor1 === 'MA') {
                <p>You chose Mathematics</p>
                firstMinor = math;
            }
            if (this.state.minor1 === 'LIT') {
                <p>You chose Literature and the Arts</p>
                firstMinor = literature;
            }
            if (this.state.minor1 === 'NA') {
                <p>You chose not to select a first minor</p>
                firstMinor = none;
            }
            if (this.state.minor1 === 'MA') {
                <p>You chose Mathematics</p>
                firstMinor = math;
            }
            if (this.state.minor1 === 'LIT') {
                <p>You chose Literature and the Arts</p>
                firstMinor = literature;
            }
            if (this.state.minor1 === 'NA') {
                <p>You chose not to select a second minor</p>
                firstMinor = none;
            }
            this.setState({major1: event.target.value});

            if (firstMajor === computerScience) {
                <DisplayScheduleCS />
            }
            
            event.preventDefault();
        }
render(){return(
        <form onSubmit={this.handleSubmit}>
            <label>
            <p>Please select a Major: Required</p>
            <select id = 'major1Selection' value={this.state.major1} onChange={this.handleChange}>
                    <option major1="CS">Computer Science</option>
                    <option major1="PY">Psychology</option>
            </select>
            </label>
            <label>
            <p>Please select a Second Major: Optional</p>
            <select id = 'major2Selection' value={this.state.major2} onChange={this.handleChange}>
                    <option major2="CS">Computer Science</option>
                    <option major2="PY">Psychology</option>
                    <option major2="NA">None</option>
            </select>
            </label>
            <label>
            <p>Please select a Minor: Optional</p>
            <select id = 'minor1Selection' value={this.state.minor1} onChange={this.handleChange}>
                    <option minor1="MA">Mathematics</option>
                    <option minor1="LIT">Literature and the Arts</option>
                    <option minor1="NA">None</option>
            </select>
            </label>
            <label>
            <p>Please select a Second Minor: Optional</p>
            <select id = 'minor2Selection' value={this.state.minor2} onChange={this.handleChange}>
                    <option minor2="MA">Mathematics</option>
                    <option minor2="LIT">Literature and the Arts</option>
                    <option minor2="NA">None</option>
            </select>
            </label>
            <input id='selectbutton' type="submit" value="Select" />
            </form>
            );
        }
}

const DisplayScheduleCS = () => {
    return (
        <div>
            <h1>This is the Computer Science schedule</h1>
        </div>
    )
}

//build schedule page for students
const StudBuild = () => {
    return (
        <div>
            <h1>This is the student schedule builder</h1>
            <ConstructSchedule id = 'stuschedule'></ConstructSchedule>
        </div>
    )
}

//build schedule page for advisors
const AdvBuild = () => {
    return (
    <div>
        <h1>This is the advisor schedule builder</h1>
        <ConstructSchedule id = 'stuschedule'></ConstructSchedule>
    </div>
    )
}

//overall build schedule, put common components here
const BuildSchedulePage = () => {
    let {user} = useContext(AuthContext)

    return (
        <div>
            {/*checks if user or advisor then renders correct one*/}
            {user.group === 'student' ?  <StudBuild /> :
             user.group === 'advisor' ? <AdvBuild /> :
             <p>I am not sure who you are!</p>}
        </div>
    )
}

export default BuildSchedulePage;