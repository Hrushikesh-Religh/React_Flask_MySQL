import React from 'react'
import '../App.css'
import { useState } from 'react'
import { useRef } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
// import s from './register.module.css'
//-----

function Register() {

  let [username, setUsername] = useState("")
  let [checkusername, setCheckusername] = useState([])
  let [email, setEmail] = useState("")
  let [checkemail, setCheckemail] = useState([])
  let [firstname, setFirstname] = useState("")
  let [lastname, setLastname] = useState("")
  let [password, setPassword] = useState("")
  let [cpassword, setCpassword] = useState("")
  let [usertype, setUsertype] = useState("")

  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const usernameformat = /^[a-z0-9_.]+$/;
  const nameformat = /^[A-Za-z0-9_.]+$/;
  let msg = useRef()
  //-----

  console.log(username);
  console.log(email);
  console.log(firstname);
  console.log(lastname);
  console.log(password);
  console.log(cpassword);
  console.log(usertype);
  console.log(checkusername);
  console.log(checkemail);
  // console.log(userdata);
  //-----

  function checkUsername() {
    axios.get(`http://localhost:5000/checkuser?username=${username}`)
      .then((res) => {
        setCheckusername(res.data[0])
      })
  }

  function checkEmail() {
    axios.get(`http://localhost:5000/checkemail?email=${email}`)
      .then((res) => {
        setCheckemail(res.data[0])
      })
  }

  function handleSubmit(e) {

    checkUsername()
    checkEmail()

    if (username === "" | email === "" | firstname === "" | lastname === "" | password === "" | cpassword === "" | usertype === "") {
      msg.current.style = "color: var(--errmsg)"
      msg.current.innerHTML = "Fill all the details! 🤨"
    }
    else if (!username.match(usernameformat)) {
      msg.current.style = "color: var(--errmsg)"
      msg.current.innerHTML = "Enter valid username! 🙄"
    }
    else if(!firstname.match(nameformat) | !lastname.match(nameformat)){
        msg.current.style = "color: var(--errmsg)"
        msg.current.innerHTML = "Enter valid Firstname and Lastname! 🙄"
    }
    else if (!email.match(mailformat)) {
      msg.current.style = "color: var(--errmsg)"
      msg.current.innerHTML = "Enter valid email address 🙄"
    }
    else if (username == checkusername | email == checkemail) {
      msg.current.style = "color: var(--errmsg)"
      msg.current.innerHTML = "Username or Email already exists! 😢"
    }
    else if (password !== cpassword) {
      msg.current.style = "color: var(--errmsg)"
      msg.current.innerHTML = "Passwords does not match! 😮"
    }
    else {
      let payload = { username, email, firstname, lastname, password, usertype }
      axios.post("http://localhost:5000/register", payload)
        .then(() => {
          console.log("Data Saved ✔");
          msg.current.style = "color: var(--successmsg)"
          msg.current.innerHTML = "Details saved ✔"
        })
        .catch(() => {
          console.log("Error Saving Details 😒");
        })
    }

    setTimeout(() => {
      msg.current.innerHTML = ""
    }, 4000);

    e.preventDefault()
  }

  return (
    <div className='register'>

      <span className='heading'>Fill below details 😇</span>

      <form action="" className='rLoginBox'>

        <input type="text" name='userName' placeholder='Enter Username'
          onChange={(e) => {
            setUsername(e.target.value)
          }} />

        <input type="email" name='email' placeholder='Enter Email'
          onChange={(e) => {
            setEmail(e.target.value)
          }} />

        <input type="text" name='firstName' placeholder='Enter First Name'
          onChange={(e) => {
            setFirstname(e.target.value)
          }} />

        <input type="text" name='lastName' placeholder='Enter Last Name'
          onChange={(e) => {
            setLastname(e.target.value)
          }} />

        <input type="password" name='password' placeholder='Password'
          onChange={(e) => {
            setPassword(e.target.value)
          }} />

        <input type="password" name='confirmPassword' placeholder='Confirm Password'
          onChange={(e) => {
            setCpassword(e.target.value)
          }} />

        <div className='selectUserType'>
          <span className='radio'>Admin:
            <input type="radio" name='selectAU' value='admin'
              onChange={(e) => {
                setUsertype(e.target.value)
              }} /></span>

          <span className='radio'>User:
            <input type="radio" name='selectAU' value='user'
              onChange={(e) => {
                setUsertype(e.target.value)
              }} /></span>

        </div>

        <input type="submit" id='regbtn' value='Register' className='btn' onClick={handleSubmit} />

        <div className='msg' ref={msg}>

        </div>
      </form>
    </div>
  )
}

export default Register