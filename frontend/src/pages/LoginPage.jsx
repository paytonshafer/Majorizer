//This is the login page for our application
import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import './styles/loginpage.css'
const LoginPage = () => {
  let { loginUser } = useContext(AuthContext)

  return (
    <div>
        <form onSubmit={loginUser}>
          <p className='fields'>
            <img src='https://www.clarkson.edu/sites/default/files/styles/max_325x325/public/media/image/2019-06/shield%20green%20and%20gold_0.png?itok=LczM7Q8j'></img>
            <input type='text' name='username' placeholder='Your username..'></input>
            <input type='password' name='password' placeholder='Your password..'></input>
            <input type='submit' />
            </p>
        </form>
    </div>
  )
}

export default LoginPage