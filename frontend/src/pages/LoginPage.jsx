//This is the login page for our application
import React from 'react'

const LoginPage = () => {
  return (
    <div>
        <form>
            <input type='text' name='username' placeholder='Enter Username'></input>
            <input type='password' name='password' placeholder='Enter Password'></input>
            <input type='submit' />
        </form>
    </div>
  )
}

export default LoginPage