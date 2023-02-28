//This is the login page for our application
import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import StaticData from '../context/StaticData'

const LoginPage = () => {
  let { loginUser } = useContext(AuthContext)
  let { advisors } = useContext(StaticData)

  return (
    <div>
        <form onSubmit={loginUser}>
            <input type='text' name='username' placeholder='Enter Username'></input>
            <input type='password' name='password' placeholder='Enter Password'></input>
            <input type='submit' />
        </form>
        <p>advisors: {advisors}</p>
    </div>
  )
}

export default LoginPage