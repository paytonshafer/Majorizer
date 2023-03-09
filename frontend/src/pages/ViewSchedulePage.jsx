import AuthContext from '../context/AuthContext';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import './styles/ViewSchedulePage.css'
import StaticData from '../context/StaticData';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import jwt_decode from 'jwt-decode';
/*
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
                        <td>{window.$mwf1}</td>b
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
*/

const MySchedule = ({ student }) => {
    let { students } = useContext(StaticData)

    const stud = students.find((stud) => stud.name === student.username)
    let schedules = stud.schedule
    let [curSchedule, setCurSchedule] = useState(stud.schedule[0])
    let [semNum, setSemNum] = useState(0)
    let [curSem, setCurSem] = useState(curSchedule.schedule[semNum])

    const RenderSchedule = () => {
        return (

        <div>
            <TableContainer component={Paper}>
                {/*<Table sx={{ minWidth: 650 }} aria-label="simple table">*/}
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>Course ID</TableCell>
                        <TableCell align="right">Course Name</TableCell>
                        <TableCell align="right">Course Desc</TableCell>
                        <TableCell align="right">Professor</TableCell>
                        <TableCell align="right">Days of Week</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {curSem.courses.map((row) => (
                        <TableRow
                            key={row.id}
                        >
                        <TableCell component="th" scope="row">
                            {row.id}
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.desc}</TableCell>
                        <TableCell align="left">{row.professor}</TableCell>
                        <TableCell align="left">{row.day}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        )
    }

    const componentDidUpdate = async () => {
        try{
            window.componentHandler.upgradeDom();
        } catch (err) {}
    }

    const lastSem = useCallback(async () => {
        if(semNum > 0){
            setSemNum(semNum - 1)
            setCurSem(curSchedule.schedule[semNum-1])  
        }       
    },[semNum, curSchedule])

    const nextSem = useCallback(async () => {
        if(semNum < curSchedule.schedule.length-1){
            setSemNum(semNum + 1)
            setCurSem(curSchedule.schedule[semNum+1])
        }
    },[semNum, curSchedule])

    const newSched = () => {
        setSemNum(0)
        setCurSem(curSchedule.schedule[semNum])
    }

    const scheduleChange = useCallback(async (selected) => {
        setCurSchedule(selected)
    }, [setCurSchedule])

    useEffect( () => {componentDidUpdate()})

    return (
        <div>
            <div className='sched-select'>
                <Select id ='schedule-select' className="basic-single" classNamePrefix="select" defaultValue={curSchedule} options={schedules} onChange={scheduleChange} autoFocus={true}/>
            </div>
            <Button onMouseDown={newSched}>GO</Button>
            <div className='sem-select'>
                <Button onMouseDown={lastSem}>Left</Button>
                <h4>Semester {semNum+1}</h4>
                <Button onMouseDown={nextSem}>Right</Button>
            </div>
            <RenderSchedule></RenderSchedule>
        </div>
    )
}

const StudView = ({user}) => {
    return (
    <div className='borderbox'>
    <h1>Welcome to the Student Schedule Viewer</h1>
    <MySchedule student={user}></MySchedule>
    {/*<ScheduleForm id = 'stuschedule'></ScheduleForm>*/}
    </div>
    )
}

//advisor view schedule page
const AdvView = ({user}) => {
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
    <div className='borderbox'>
    <h1>Welcome to the Advisor Schedule Viewer</h1>
    {viewing ?
        <div>
            <h3>Student: {curStud.username}</h3>
            <Button onMouseDown={goBack}>Back</Button>
            <MySchedule student={curStud}></MySchedule>
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

const ViewSchedulePage = () => {
    let {user} = useContext(AuthContext)

    return (
        <div>
            {user.group === 'student' ? <StudView user={user} /> :
             user.group === 'advisor' ? <AdvView user={user}/> :
             <p>I am not sure who you are!</p>}
        </div>
    )
}

export default ViewSchedulePage;