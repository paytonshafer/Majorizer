import AuthContext from '../context/AuthContext';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import './styles/ViewSchedulePage.css'
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
    let stud_id = student.id
    let [schedules, setSchedules] = useState()
    let [curSchedule, setCurSchedule] = useState()
    let [semNum, setSemNum] = useState(0)
    let [curSem, setCurSem] = useState()


    useEffect(()=>{
        let getStudSchedules = async () => {
            //Here we fetch from our api with the username and password to return our auth tokens
            let response = await fetch('http://127.0.0.1:8000/api/schedule/' + stud_id, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            let data = await response.json() //This should get the auth tokens if successful
    
            if(response.status === 200){ //if response is all good
                setSchedules(data)
                localStorage.setItem(stud_id + '_schedules', JSON.stringify(data)) //put the auth tokens in local storage
            }else{alert('Something went wrong')}
        }
        getStudSchedules()
    },[stud_id])
    //TODO: take scchedules and use them

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        
          backgroundColor: '#004e42',
          color: theme.palette.common.white,
          fontSize: 14,
        
      }));
      
    const RenderSchedule = () => {
        let courses = [];
        if(curSem){
            for (var i = 1; i < 6; i++) {
                let class_id = 'course' + i
                courses.push(
                    curSem[class_id] ?
                    <TableRow key={curSem[class_id].id}>
                        <StyledTableCell component="th" scope="row">{curSem[class_id].course_code}</StyledTableCell>
                        <TableCell align="left">{curSem[class_id].title}</TableCell>
                        <TableCell align="left"><Button color="success" onClick={()=>(alert(curSem[class_id].description))}>click to expand</Button>{/*curSem[class_id].desc*/}</TableCell>
                        <TableCell align="left">{curSem[class_id].professor}</TableCell>
                        <TableCell align="left">{curSem[class_id].days}</TableCell>
                    </TableRow> : null
                )
            }
        }
        return (
        <div>
            <ThemeProvider theme={theme}>
            <TableContainer component={Paper}>
                {/*<Table sx={{ minWidth: 650 }} aria-label="simple table">*/}
                <Table>
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Course ID</StyledTableCell>
                        <StyledTableCell align="left">Course Name</StyledTableCell>
                        <StyledTableCell align="left">Course Desc</StyledTableCell>
                        <StyledTableCell align="left">Professor</StyledTableCell>
                        <StyledTableCell align="left">Days of Week</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {curSem ? courses : null}
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
        setCurSem(curSchedule.semester1)
        setSemNum(0)
    }
    const updateTab = (num) => {
        console.log(curSchedule)
        setSemNum(num);
        let sem = 'semester' + (num+1)
        setCurSem(curSchedule[sem]);
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
                <Select id ='schedule-select' className="basic-single" classNamePrefix="select" options={schedules} onChange={scheduleChange}/>
            </div>
            <Button onMouseDown={newSched} variant = 'contained'>GO</Button>
            <div className='sem-select'>
                <br/>
                <h4>Semester {semNum+1}</h4>
                <br/>
                <button onClick={() => updateTab(-1)}>previously taken courses</button>
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
    let [connections, ] = useState(()=> localStorage.getItem('advconnections') ? JSON.parse(localStorage.getItem('advconnections')) : null)
    let [viewing, setViewing] = useState(false)
    let [curStud, setCurStud] = useState('')
    let [selectedStud, setSelectedStud] = useState('none')

    //let curStud = jwt_decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg2NzU5MTIwLCJpYXQiOjE2NzgxMTkxMjAsImp0aSI6IjMwODJhN2UzMTY2YTQwOThhZTFhYWU0Yzk2ZDFhNTc4IiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJzdHVkZW50MSIsImdyb3VwIjoic3R1ZGVudCJ9.pwTUiT6DLribnJ8ESFzo7dvF9MlVLxiv_F-22r5ENQo')

    let students = []
    if(connections){
        connections.map((conn) => (students.push({stud: conn.student.student.username,label: conn.student.student.username})))
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