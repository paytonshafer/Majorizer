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

class ConstructSchedulePt1 extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            major1: 'CS',
            major2: 'NA',
            minor1: 'NA',
            minor2: 'NA'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        }
        handleChange(event){
            const target = event.target;
            const value = target.value;
            const name = target.name;
            this.setState({[name]: value});
        }
        handleSubmit(event){
            <div>
            {
                this.state.major1 === 'CS' ? <DisplayScheduleCS /> :
                this.state.major2 === 'PY' ? <DisplayScheduleCS /> :
                <p>Something has gone wrong!</p>
            }
            </div>
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

            <div>
            <DisplayScheduleCS></DisplayScheduleCS>
            </div>

            event.preventDefault();
        }
render(){return(
        <form onSubmit={this.handleSubmit}>
            <label>
            <p>Please select a Major: Required</p>
            <select name = 'major1' value={this.state.major1} onChange={this.handleChange}>
                    <option value="CS">Computer Science</option>
                    <option value="PY">Psychology</option>
            </select>
            </label>
            <label>
            <p>Please select a Second Major: Optional</p>
            <select name = 'major2' value={this.state.major2} onChange={this.handleChange}>
                    <option value="CS">Computer Science</option>
                    <option value="PY">Psychology</option>
                    <option value="NA">None</option>
            </select>
            </label>
            <label>
            <p>Please select a Minor: Optional</p>
            <select name = 'minor1' value={this.state.minor1} onChange={this.handleChange}>
                    <option value="MA">Mathematics</option>
                    <option value="LIT">Literature and the Arts</option>
                    <option value="NA">None</option>
            </select>
            </label>
            <label>
            <p>Please select a Second Minor: Optional</p>
            <select name = 'minor2' value={this.state.minor2} onChange={this.handleChange}>
                    <option value="MA">Mathematics</option>
                    <option value="LIT">Literature and the Arts</option>
                    <option value="NA">None</option>
            </select>
            </label>
            <input id='selectbutton' type="submit" value="Submit" />
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
            <DisplayScheduleCS></DisplayScheduleCS>
            <ConstructSchedulePt1 id = 'stuschedule'></ConstructSchedulePt1>
        </div>
    )
}

//build schedule page for advisors
const AdvBuild = () => {
    return (
    <div>
        <h1>This is the advisor schedule builder</h1>
        <ConstructSchedulePt1 id = 'advschedule'></ConstructSchedulePt1>
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