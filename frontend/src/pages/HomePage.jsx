//This is the code for our home page
import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext.js'

const HomePage = () => {
    let {user} = useContext(AuthContext)

    return (
        <div>
            <p>Hello {user.username} you are a {user.group}</p>
        </div>
    )
}

export default HomePage;