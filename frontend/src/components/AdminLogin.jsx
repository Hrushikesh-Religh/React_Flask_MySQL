import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
// import s from './userLogin.module.css'
//-----

function AdminLogin() {

    let [username, setUsername] = useState("")
    let [email, setEmail] = useState("")
    let [firstdata, setFirsdata] = useState("")
    let [password, setPassword] = useState("")
    let [login, setLogin] = useState([{}])

    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let msg = useRef()
    let nav = useNavigate()
    //-----
    console.log(username);
    console.log(password);
    // console.log(login);
    // console.log(firstdata);
    //-----
    useEffect(()=>{
        axios.get(`http://localhost:5000/login?username=${username}`)
        .then((res) => {
            setLogin(res.data[0])
            // console.log(login[0])
        })
        .catch(() => {
            console.log("Error fetching data 😒");
        })
    },[username])

    useEffect(()=>{
        axios.get(`http://localhost:5000/login?email=${email}`)
        .then((res) => {
            setLogin(res.data[0])
            // console.log(login[0])
        })
        .catch(() => {
            console.log("Error fetching data 😒");
        })
    },[email])

    function handleSubmit(e) {
        if (username !== "" & password !== "") {
            if (login[0] == null | password != login[0]) {
                msg.current.style = "color: var(--errsmsg)"
                msg.current.innerHTML = "Username or Passsword is not correct!"
            }
            else if(login[1] == 'user') {
                msg.current.style = "color: var(--errsmsg)"
                msg.current.innerHTML = "User can login at Admin login section!"
            }
            else{
                msg.current.style = "color: var(--successsmsg)"
                msg.current.innerHTML = "Login Successfull! 😉"
                return nav("/addtask")
              }
            }
            else if(email !== "" & password !== ""){
              if (login[0] == null | password != login[0]) {
                msg.current.style = "color: var(--errsmsg)"
                msg.current.innerHTML = "Email or Passsword is not correct!"
              }
              else if(login[1] == 'user') {
                msg.current.style = "color: var(--errsmsg)"
                msg.current.innerHTML = "User can login at Admin login section!"
              }
              else {
                msg.current.style = "color: var(--successsmsg)"
                msg.current.innerHTML = "Login Successfull! 😉"
                return nav("/addtask")
            }
        }
        else{
            msg.current.style = "color: var(--errsmsg)"
            msg.current.innerHTML = "Fill all the required field!"    
        }
        e.preventDefault()
    }
    //-----
    return (
        <div className='loginBox'>
            <span className='heading'>Admin Login</span>
            <form action="" className='loginFormBox'>
                <input type="text" name='username' placeholder='Enter Username'
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }} />
                <span>Or</span>
                <input type="text" name='email' placeholder='Enter Email'
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }} /><br /><br />
                <input type="password" name='password' placeholder='Enter Password'
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                <input type="submit" id='ulbtn' value='Login' className='btn' onClick={handleSubmit} />
                <div className='msg' ref={msg}>
                </div>
            </form>
        </div>
    )
}

export default AdminLogin