//This is the code for our Schedule Building Page
import AuthContext from '../context/AuthContext';
import React, { useContext } from 'react';
import './styles/BuildSchedulePage.css'


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
            this.setState({value: event.target.value});
        }
        handleSubmit(event){
            if (this.state.major1 === 'CS') {
                <p>You chose Computer Science</p>
            }
            if (this.state.major1 === 'PY') {
                <p>You chose Psychology</p>
            }
            this.setState({major1: event.target.value});
            
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
    return (<p>This is the advisor schedule builder</p>)
}

//overall build schedule, put common components here
const BuildSchedulePage = () => {
    let {user} = useContext(AuthContext)

    return (
        <div>
            {/*checks if user or advisor then renders correct one*/}
            {user.group === 'student' ? <StudBuild /> :
             user.group === 'advisor' ? <AdvBuild /> :
             <p>I am not sure who you are!</p>}
        </div>
    )
}

export default BuildSchedulePage;