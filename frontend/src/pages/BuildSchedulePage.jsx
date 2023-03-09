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
            minor2: 'NA',
            previousCourses: ''
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
                firstMajor = computerScience;
            }
            if (this.state.major1 === 'PY') {
                firstMajor = psychology;
            }
            if (this.state.major2 === 'CS') {
                secondMajor = computerScience;
            }
            if (this.state.major2 === 'PY') {
                secondMajor = psychology;
            }
            if (this.state.major2 === 'NA') {
                secondMajor = none;
            }
            if (this.state.minor1 === 'MA') {
                firstMinor = math;
            }
            if (this.state.minor1 === 'LIT') {
                firstMinor = literature;
            }
            if (this.state.minor1 === 'NA') {
                firstMinor = none;
            }
            if (this.state.minor1 === 'MA') {
                firstMinor = math;
            }
            if (this.state.minor1 === 'LIT') {
                firstMinor = literature;
            }
            if (this.state.minor1 === 'NA') {
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
            <h2 className='buildFormHeader'>Major and Minor Selection(s):</h2>
            <p className='selectionInstruction'>Please select a Major: Required</p>
            <select name = 'major1' value={this.state.major1} onChange={this.handleChange}>
                    <option value="CS">Computer Science</option>
                    <option value="PY">Psychology</option>
            </select>
            </label>
            <label>
            <p className='selectionInstruction'>Please select a Second Major: Optional</p>
            <select name = 'major2' value={this.state.major2} onChange={this.handleChange}>
                    <option value="CS">Computer Science</option>
                    <option value="PY">Psychology</option>
                    <option value="NA">None</option>
            </select>
            </label>
            <label>
            <p className='selectionInstruction'>Please select a Minor: Optional</p>
            <select name = 'minor1' value={this.state.minor1} onChange={this.handleChange}>
                    <option value="MA">Mathematics</option>
                    <option value="LIT">Literature and the Arts</option>
                    <option value="NA">None</option>
            </select>
            </label>
            <label>
            <p className='selectionInstruction'>Please select a Second Minor: Optional</p>
            <select name = 'minor2' value={this.state.minor2} onChange={this.handleChange}>
                    <option value="MA">Mathematics</option>
                    <option value="LIT">Literature and the Arts</option>
                    <option value="NA">None</option>
            </select>
            </label>
            <p></p>
            <h2 className='buildFormHeader'>Previous Course Input:</h2>
            <p className='selectionInstruction'>Please list all courses you have taken and passed previously:</p>
            <p className='subInstruction'>Course Input should match the following form: CS141, MA131</p>
            <p className='subInstruction'>If you have not taken any courses at Clarkson please leave the box empty</p>
            <label>
            <input id='textInputBox' type="text" name='previousCourses' value={this.state.previousCourses} onChange={this.handleChange}/>
            </label>
            <p></p>
            <a href="/view">Submit & Build Schedule</a>
            </form>
            );
        }
}

const DisplayScheduleCS = () => {
    <div>
        <p>This is a placeholder for stuff for when we move into to integration</p>
    </div>
}


//build schedule page for students
const StudBuild = () => {
    return (
        <div>
            <h1 className='scheduleBuildGreeter'>This is the student schedule builder</h1>
            <ConstructSchedulePt1 id = 'stuschedule'></ConstructSchedulePt1>
        </div>
    )
}

//build schedule page for advisors
const AdvBuild = () => {
    return (
    <div>
        <h1 className='scheduleBuildGreeter'>This is the advisor schedule builder</h1>
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