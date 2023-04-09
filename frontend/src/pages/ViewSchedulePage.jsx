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
import { Button, createTheme, ThemeProvider, styled} from '@mui/material';
import jwt_decode from 'jwt-decode';

const MySchedule = ({ student }) => {
    let { students } = useContext(StaticData)

    const stud = students.find((stud) => stud.name === student.username)
    let schedules = stud.schedule
    let [curSchedule, setCurSchedule] = useState(stud.schedule[0])
    let [semNum, setSemNum] = useState(0)
    let [curSem, setCurSem] = useState(curSchedule.schedule[semNum])

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        
          backgroundColor: '#004e42',
          color: theme.palette.common.white,
          fontSize: 14,
        
      }));
      
    const RenderSchedule = () => {
        return (
            
        <div>
            <ThemeProvider theme={theme}>
            <TableContainer component={Paper}>
                {/*<Table sx={{ minWidth: 650 }} aria-label="simple table">*/}
                <Table>
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Course ID</StyledTableCell>
                        <StyledTableCell align="right">Course Name</StyledTableCell>
                        <StyledTableCell align="right">Course Desc</StyledTableCell>
                        <StyledTableCell align="right">Professor</StyledTableCell>
                        <StyledTableCell align="right">Days of Week</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {curSem.courses.map((row) => (
                        <TableRow
                            key={row.id}
                        >
                        <StyledTableCell component="th" scope="row">
                            {row.id}
                        </StyledTableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.desc}</TableCell>
                        <TableCell align="left">{row.professor}</TableCell>
                        <TableCell align="left">{row.day}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </ThemeProvider>
        </div>
        )
    }

    const componentDidUpdate = async () => {
        try{
            window.componentHandler.upgradeDom();
        } catch (err) {}
    }

    /*const lastSem = useCallback(async () => {
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
    },[semNum, curSchedule])*/

    const newSched = () => {
        setSemNum(0)
        setCurSem(curSchedule.schedule[semNum])
    }
    const updateTab = (num) => {
        setSemNum(num);
        setCurSem(curSchedule.schedule[num]);
    }
    const scheduleChange = useCallback(async (selected) => {
        setCurSchedule(selected)
    }, [setCurSchedule])

    useEffect( () => {componentDidUpdate()})

    const theme = createTheme({
        palette: {
            primary: {
                main: '#004e42'
            }
        },
        typography: {
            fontFamily:  'Karla, sans-serif',
        }
    });
    /*
    const LRButton = styled(Button)({
        boxShadow: 'none',
        fontSize: 24,
    })
    const StyledSelect = styled(Select)({
        
    })*/
    return (
        <div>
            <ThemeProvider theme={theme}>
            <div className='sched-select'>
                <Select id ='schedule-select' className="basic-single" classNamePrefix="select" defaultValue={curSchedule} options={schedules} onChange={scheduleChange} />
            </div>
            <Button onMouseDown={newSched} variant = 'contained'>GO</Button>
            <div className='sem-select'>
                <br/>
                <h4>Semester {semNum+1}</h4>
                <br/>
                <div className='tabs'>
                <button onClick={() => updateTab(0)}>1</button>
                <button onClick={() => updateTab(1)}>2</button>
                <button onClick={() => updateTab(2)}>3</button>
                <button onClick={() => updateTab(3)}>4</button>
                <button onClick={() => updateTab(4)}>5</button>
                <button onClick={() => updateTab(5)}>6</button>
                <button onClick={() => updateTab(6)}>7</button>
                <button onClick={() => updateTab(7)}>8</button>
                </div>
                <br/>
            </div>
            <RenderSchedule></RenderSchedule>
            </ThemeProvider>
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