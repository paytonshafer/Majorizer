import AuthContext from '../context/AuthContext';
import React, { useContext } from 'react';

//student view schedule page
const StudView = () => {
    return (<p>This is the student schedule viewer</p>)
}

//advisor view schedule page
const AdvView = () => {
    return (<p>This is the advisor schedule viewer</p>)
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