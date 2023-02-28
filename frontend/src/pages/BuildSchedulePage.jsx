import AuthContext from '../context/AuthContext';
import React, { useContext } from 'react';

//build schedule page for students
const StudBuild = () => {
    return (<p>This is the student schedule builder</p>)
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