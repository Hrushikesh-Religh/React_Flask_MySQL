import React from 'react'
import { useState } from 'react'
// import AdminLogin from './AdminLogin'
import UserLogin from './UserLogin'
import s from './login.module.css'
import '../App.css'
import { useRef } from 'react'
import { useEffect } from 'react'
//-----

function Login() {

    // let [isAdmin, setIsAdmin] = useState(true)
    // let [isBtnClicked, setIsBtnClicked] = useState(false)
    // let btn1 = useRef()
    // let btn2 = useRef()
    //-----

    return (
        <div className='mainLoginBox'>

            <div className='login'>
                <UserLogin /> 
            </div>

        </div>
    )
}

export default Login