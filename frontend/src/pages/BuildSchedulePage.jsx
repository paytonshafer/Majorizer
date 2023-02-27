import AuthContext from '../context/AuthContext';
import React, { useContext } from 'react';

const StudBuild = () => {
    return (<p>This is the student schedule builder</p>)
}

const AdvBuild = () => {
    return (<p>This is the advisor schedule builder</p>)
}

const BuildSchedulePage = () => {
    let {user} = useContext(AuthContext)

    return (
        <div>
            {user.group === 'student' ? <StudBuild /> :
             user.group === 'advisor' ? <AdvBuild /> :
             <p>I am not sure who you are!</p>}
        </div>
    )
}

export default BuildSchedulePage;