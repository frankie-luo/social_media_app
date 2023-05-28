import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../redux/actions/authAction";

const Auth = () => {

  const initialAuthData = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  }

  const loading = useSelector(state => state.auth.loading)
  const [userAuthData, setUserAuthData] = useState(initialAuthData)
  const [signup, setSignup] = useState(false)
  const [confirmPass, setConfirmPass] = useState(true)
  const dispatch = useDispatch()

  const handleChange = e => {
    setUserAuthData(prev => ({...prev, [e.target.id]: e.target.value}))
  }

  const handleSubmit = e => {
    setConfirmPass(true)
    e.preventDefault()
    if (signup) {
      userAuthData.password === userAuthData.confirmpass ? dispatch(signUp(userAuthData)) : setConfirmPass(false)
    } else {
      dispatch(logIn(userAuthData))
    }
  }

  const resetForm = () => {
    setUserAuthData(initialAuthData);
    setConfirmPass(true);
  };


  return (
    <div className="Auth">

      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Medios</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{ signup ? 'Sign Up' : 'Log In' }</h3>

          {signup && 
          <div>
            <input
              type="text"
              placeholder="First Name"
              className="infoInput"
              id="firstname"
              value={userAuthData.firstname}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="infoInput"
              id="lastname"
              value={userAuthData.lastname}
              onChange={handleChange}
            />
          </div>}
          
          <div>
            <input
              type="text"
              placeholder="Username"
              className="infoInput"
              id="username"
              value={userAuthData.username}
              onChange={handleChange}
            />
          </div>
  
          <div style={{display: 'relative'}}>
            <input
              type="password"
              className="infoInput"
              placeholder="Password"
              id="password"
              value={userAuthData.password}
              onChange={handleChange}
            />
            {signup &&
              <input
              type="text"
              className="infoInput"
              id="confirmpass"
              placeholder="Confirm Password"
              value={userAuthData.confirmpass}
              onChange={handleChange}
            />
            }
          </div>
          <span style={{color: 'red', fontSize: 12 + 'px', display: confirmPass ? 'none' : 'block', alignSelf: 'flex-end', position: 'absolute', top: 280 + 'px'}}>* Passwords DO NOT match</span>
          <div>
              <span style={{fontSize: '12px', cursor: 'pointer'}} onClick={() => {setSignup(prev => !prev); resetForm()}}>{signup ? 'Already have an account? Login!' : 'Don\'t have an account? Signup!'}</span>
          </div>
          <button className="button infoButton" type="Submit" disabled={loading}>
              {loading ? 'Loading...' : signup ? "Sign Up" : "Log In"}
          </button>
      </form>
    </div>
      
    </div>
  )
}

export default Auth;