import axios from 'axios'
import React from 'react'
import '../App.css'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './userLogin.module.css'
//-----

function UserLogin() {

    let [username, setUsername] = useState("")
    let [email, setEmail] = useState("")
    // let [firstdata, setFirsdata] = useState("")
    let [password, setPassword] = useState("")
    let [login, setLogin] = useState([])

    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const usernameformat =  /^[a-z0-9_.]+$/;

    let lmsg = useRef()

    let nav = useNavigate()
    //-----
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(login);
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
            if (login == undefined) {
                lmsg.current.style = "color: var(--errmsg)"
                lmsg.current.innerHTML = "Username or Passsword is not correct! "
            }
            else if(password != login[0]){
                lmsg.current.style = "color: var(--errmsg)"
                lmsg.current.innerHTML = "Passsword is not correct! "
            }
            else if(login[1] == 'admin' & password == login[0]) {
                lmsg.current.style = "color: var(--successsmsg)"
                lmsg.current.innerHTML = "Login Successfull! 😉"
                nav(`/addtask/${username}`)
            }
            else if(login[1] == 'user' & password == login[0]){
                lmsg.current.style = "color: var(--successsmsg)"
                lmsg.current.innerHTML = "Login Successfull! 😉"
                return nav(`/userhome/${username}`)
            }
        }
        else{
            // lmsg.current.style = "color: var(--errsmsg)"
            lmsg.current.innerHTML = "Fill all the required field! 🤨"    
        }
        e.preventDefault()
    }
    //-----
    return (
        <div className='login'>
            <span className='heading'>Enter Login Details 😉</span>
            <form action="" className='rLoginBox'>
                <input type="text" name='firstdata' placeholder='Enter Username/Email'
                    onChange={(e) => {
                        if(e.target.value.match(mailformat)){
                            setEmail(e.target.value)
                        }else{
                            setUsername(e.target.value)
                        }
                    }} />
                <input type="password" name='password' placeholder='Enter Password'
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                <input type="submit" id='ulbtn' value='Login' className='btn' onClick={handleSubmit} />
                <div className={s.lmsg} ref={lmsg}>

                </div>
            </form>
        </div>
    )
}

export default UserLogin