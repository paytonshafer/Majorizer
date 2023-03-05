import AuthContext from '../context/AuthContext';
import React, { useContext, useState } from 'react';
import './styles/ViewSchedulePage.css'
import StaticData from '../context/StaticData';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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
    let { user } = useContext(AuthContext)
    let { advisor_connections, students } = useContext(StaticData)
    let [test, setTest] = useState('1')

    const stud = students.find((stud) => stud.name === student.username)
    let schedule = stud.schedule[0]
    let [semNum, setSemNum] = useState(0)
    let [curSem, setCurSem] = useState(schedule[semNum])

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
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.desc}</TableCell>
                        <TableCell align="right">{row.professor}</TableCell>
                        <TableCell align="right">{row.day}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        )
    }

    const lastSem = () => {
        if(semNum > 0){
            setSemNum(semNum--)
            setCurSem(schedule[semNum]) 
            setTest('2')          
        }
    }

    const nextSem = () => {
        if(semNum < schedule.length){
            setSemNum(semNum++)
            setCurSem(schedule[semNum])
            setTest('0')
        }
    }

    return (
        <div>
            <div className='sem-select'>
                <button onClick={lastSem}>Left</button>
                <button onClick={nextSem}>Right</button>
            </div>
            <h4>Semester {semNum}</h4>
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
const AdvView = () => {
    return (
    <div className='borderbox'>
    <h1>Welcome to the Advisor Schedule Viewer</h1>
    <h2> Please see students Schedules Below</h2>
    {/*<ScheduleForm id = 'advschedule'></ScheduleForm>*/}
    </div>
    )
}

const ViewSchedulePage = () => {
    let {user} = useContext(AuthContext)

    return (
        <div>
            {user.group === 'student' ? <StudView user={user} /> :
             user.group === 'advisor' ? <AdvView /> :
             <p>I am not sure who you are!</p>}
        </div>
    )
}

export default ViewSchedulePage;