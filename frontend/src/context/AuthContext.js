import { createContext, useState} from "react";
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext() //Create the context

export default AuthContext; //export the context

//The below is the auth provider, this is what goes in the jsx code
export const AuthProvider = ({children}) => {
    //Check if the auth tokens are in local storage otherwise null
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    //check for local auth tokens then get user from them otherwise null
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)

    const history = useNavigate()//This allows us to navigate through pages

    //The below function takes care of logging in a user
    let loginUser = async (e) => {
        e.preventDefault() //stops the default form from being submitted
        
        //Here we fetch from our api with the username and password to return our auth tokens
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json() //This should get the auth tokens if successful

        if(response.status === 200){ //if response is all good
            setAuthTokens(data) //set auth tokens
            setUser(jwt_decode(data.access)) //set the user
            localStorage.setItem('authTokens', JSON.stringify(data)) //put the auth tokens in local storage
            history('/home') //navigate the user to home page
        }else{alert('Something went wrong')}
    }

    //This function logs our the user
    let logoutUser = () => {
        //we set the user and tokens to null and remove the auth tokens from local storage
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history('/') //navigate the user back to login page
    }

    //This is the ontext data that we will want to send to different parts of the front end
    let contextData = {
        user: user,
        authTokens: authTokens,
        setAuthTokens: setAuthTokens,
        setUser: setUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    //we return the authprovider such that the children of it have acess to the content
    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}