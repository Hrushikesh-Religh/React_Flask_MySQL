import { useEffect, useRef, useState } from 'react';
import Register from './Register'
import Login from './Login';
import '../App.css';
//-----

function Home() {

  //states
  let [isToggle, setIsToggle] = useState(true)
  //-----

  //userefs
  let btn1 = useRef()
  let btn2 = useRef()
  //----- 

  //useeffects
  useEffect(() => {
    btn1.current.style = "background-color: var(--btn)"
  }, [])
  //-----

  return (
    <div className='home'>
      <div className='mainContent'>
        <span className='buttons'>

          <button ref={btn1}
            onClick={() => {
              setIsToggle(true)
              btn1.current.style = "background-color: var(--btn)";
              btn2.current.style = "background-color: var(--subbg)";
            }}>Register</button>

          <button ref={btn2}
            onClick={() => {
              setIsToggle(false)
              btn2.current.style = "background-color: var(--btn)";
              btn1.current.style = "background-color: var(--subbg)";
            }}>Login</button>

        </span>

        {isToggle ? <Register /> : <Login />}

      </div>
    </div>
  )
}

export default Home