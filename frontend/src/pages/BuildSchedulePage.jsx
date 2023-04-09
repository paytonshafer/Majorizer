//This is the code for our Schedule Building Page
import AuthContext from '../context/AuthContext';
import React, {useContext, useState } from 'react';
import './styles/BuildSchedulePage.css'
import './styles/BuildSchedulePage.css'
import StaticData from '../context/StaticData';
import Select from 'react-select';
import { Button} from '@mui/material';
import jwt_decode from 'jwt-decode';
let firstMajor;
let secondMajor;
let firstMinor;
let secondMinor;
const computerScience = 'computer science';
const psychology = 'psychology';
const literature = 'literature';
const math = 'math';
const none = 'none';

class ConstructSchedulePt1 extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            major1: 'CS',
            major2: 'NA',
            minor1: 'NA',
            minor2: 'NA',
            previousCourses: '',
            scheduleName: 'Schedule 1',
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
            event.preventDefault();

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
                secondMinor = math;
            }
            if (this.state.minor1 === 'LIT') {
                secondMinor = literature;
            }
            if (this.state.minor1 === 'NA') {
                secondMinor = none;
            }
            if (((this.state.major1 === this.state.major2) && (this.state.major1 !== 'NA')) ||
                ((this.state.minor1 === this.state.minor2) && (this.state.minor1 !== 'NA')) ||
                ((this.state.major1 === this.state.minor1) && (this.state.major1 !== 'NA')) ||
                ((this.state.major2 === this.state.minor1) && (this.state.major2 !== 'NA')) ||
                ((this.state.major1 === this.state.minor2) && (this.state.major1 !== 'NA')) ||
                ((this.state.major2 === this.state.minor2) && (this.state.major2 !== 'NA'))
                )
                {
                    alert("Invalid major/minor pairings. Multiple of the same selection were made.");
                }
                else {
            alert(JSON.stringify({'major1': firstMajor, 'major2': secondMajor, 'minor1': firstMinor, 'minor2': secondMinor, 'previousCourses': event.target.textInputBox.value, 'scheduleName': event.target.textInputBox2.value}))
                }
        }
    render(){return(
        <div className='borderbox'>
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
            </label><br/>
            <h2 className='buildFormHeader'>Name Schedule:</h2><br/>
            <label>
            <input id='textInputBox2' type="text" name='scheduleName' value={this.state.scheduleName} onChange={this.handleChange}/><br/>
            </label>
            <p></p>
            <input id='submit' type='submit' value='Submit'/>
        </form>
        </div>
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
const AdvBuild = ({user}) => {
        let { advisor_connections } = useContext(StaticData)
        let [ viewing, setViewing ] = useState(false)
        let [curStud, setCurStud] = useState('')
        let [selectedStud, setSelectedStud] = useState('')
    
        //let curStud = jwt_decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg2NzU5MTIwLCJpYXQiOjE2NzgxMTkxMjAsImp0aSI6IjMwODJhN2UzMTY2YTQwOThhZTFhYWU0Yzk2ZDFhNTc4IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJzdHVkZW50MSIsImdyb3VwIjoic3R1ZGVudCJ9.pwTUiT6DLribnJ8ESFzo7dvF9MlVLxiv_F-22r5ENQo')
    
        let students = []
        for(let i = 0; i < advisor_connections.length; i++){
            if(advisor_connections[i].adv === user.username){
                students.push(advisor_connections[i])
            }
        }
    
        let getStudent = async () => {
            let response = await fetch('http://127.0.0.1:8000/api/token/', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'username': selectedStud, 'password':'majorizer'})
            })
            let data = await response.json()
    
            if(response.status === 200){ //if response is all good
                setCurStud(jwt_decode(data.access))
                setViewing(true)
            }else{alert('Something went wrong')}
        }
    
        let studSelect = async (selected) => {
            setSelectedStud(selected.stud)
        }
    
        let goBack = () => {
            setViewing(false)
            setCurStud('')
            setSelectedStud('')
        }
    
        let select = () =>{
            getStudent()
        }
    
        return (
        <div>
        <h1>Welcome to the Advisor Schedule Builder</h1>
        {viewing ?
            <div>
                <div>
                    <h3><i>Currently Building for Student: {curStud.username}</i></h3>
                    <Button onClick={goBack}>Back</Button>
                </div>
                <ConstructSchedulePt1 id = 'advschedule'></ConstructSchedulePt1>
            </div> :
            <div>
                <h2> Please select a student below</h2>
                <Select name='studselect' id ='schedule-select' className="basic-single"  classNamePrefix="select" options={students} onChange={studSelect}/>
                <Button onClick={select}>Select</Button>
            </div>}
        {/*<ScheduleForm id = 'advschedule'></ScheduleForm>*/}
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
             user.group === 'advisor' ? <AdvBuild user = {user}/> :
             <p>I am not sure who you are!</p>}
        </div>
    )
}

export default BuildSchedulePage;