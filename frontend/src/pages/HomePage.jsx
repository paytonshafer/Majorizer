//This is the code for our home page
import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext.js'

const HomePage = () => {
    let {user, logoutUser} = useContext(AuthContext)

    return (
        <div>
            <p>Hello {user.username} you are a {user.group}</p>
            <p onClick={logoutUser}>Logout</p>
        </div>
    )
}

export default HomePage;