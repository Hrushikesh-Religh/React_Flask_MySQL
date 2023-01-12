import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import '../App.css';
import Login from './Login';
import Register from './Register'
import UserLogin from './UserLogin';
import addTask from './AddTask'

function Home() {
  let [isToggle, setIsToggle] = useState(true)
  let [btn, setBtn] = useState(true)
  // let [btn2,setBtn2] = useState(true)

  let btn1 = useRef()
  let btn2 = useRef()

  useEffect(() => {
    btn1.current.style = "background-color: var(--btn)"
  }, [])

  return (
    <div className='home'>
      <div className='mainContent'>
        <span className='buttons'>
          <button ref={btn1}
            onClick={() => {
              setIsToggle(true)
              // setBtn(true)
              btn1.current.style = "background-color: var(--btn)";
              btn2.current.style = "background-color: var(--subbg)";
            }}>Register</button>

          <button ref={btn2}
            onClick={() => {
              setIsToggle(false)
              // setBtn(false)
              btn2.current.style = "background-color: var(--btn)";
              btn1.current.style = "background-color: var(--subbg)";
            }}>Login</button>
        </span>

        {isToggle ? <Register /> : <UserLogin />}

      </div>
    </div>
  )
}

export default Home