import axios from 'axios'
import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import s from './userhomepage.module.css'

function Userhomepage() {

  let { user } = useParams()
  // const location = useLocation()
  let [userdata, setUserdata] = useState([])
  let [isLoggedIn, setIsLoggedIn] = useState(false)
  let nav = useNavigate()
  let statuslist = ["Todo", "In Progress", "Ready For Test", "Done"]
  let [newstatus, setNewstatus] = useState("")
  let today = ""
  let deadline = useRef()
  let [dateloaded, setDateloaded] = useState("")
  // let [reloadpage, setReloadPage] = useState(0)
  //-----
  // console.log(userdata);
  //-----
  useEffect(() => {
    // location.push(`/userhome/${user}`)
    axios.get(`http://localhost:5000/getuserdata?username=${user}`)
      .then((res) => {
        setUserdata(res.data)
        console.log("Data retreived !");
        console.log(userdata)
        getTodaysDate()
        setDateloaded(res.data[7])
        // if(dateloaded <= today){
        //   deadline.current.style = "border : 2px solid red"
        // }
        setIsLoggedIn(true)
        
        // {(isLoggedIn) ? Window.location.reload("/home") : Window.location.reload(`/userhome/${user}`)}

      })
      .catch(() => {
        console.log("Error retreiving data !");
      })

  }, [])

  function getTodaysDate(){
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    today = year + "-" + month + "-" + day;
    console.log(today);
    // if(deadline.current.innerHTML >= today){
    //   deadline.current.style = "border : 2px solid red"
    // }

    // document.getElementById("startdate").value = today;
}
  // function handleStatusChange(id){
  //   console.log(id);
  //   let payload = {newstatus , id}
  //   axios.post("http://localhost:5000/updatestatus", payload)
  //   .then(()=>{
  //     console.log("Status Updated ✔");
  //     // setReloadPage(reloadpage+1)
  //   })
  //   .catch(()=>{
  //     console.log("Error updating status !");
  //   })
  // }
  //-----
  return (
    <div className={s.userhomepage}>
      <span className={s.heading}>User Login: {user}</span>
      <span className={s.subHeading}>Task List :</span>
      <table>
        <thead>

          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Deadline date</th>
            <th>Status</th>
            <th>Action</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>

          {
            userdata.map((data) => {
              return (
                <tr key={data[0]}>
                  <td>{data[0]}</td>
                  <td>{data[1]}</td>
                  <td>{data[2]}</td>
                  {/* <td>{data[3]}</td> */}
                  <td>{data[4] ? data[4] : '-'}</td>
                  <td>{data[5] ? data[5] : '-'}</td>
                  <td ref={deadline}>{data[6] ? data[6] : '-'}</td>
                  <td>{data[7] ? data[7] : '-'}</td>
                  <td>{<>
                    <select name="selectstatus" defaultValue={data[7]}
                      onChange={(e) => {
                        let newstatus = e.target.value
                        let id = data[0]
                        let payload = { newstatus, id }
                        axios.post("http://localhost:5000/updatestatus", payload)
                          .then(() => {
                            console.log("Status Updated ✔");
                            // setReloadPage(reloadpage+1)
                          })
                          .catch(() => {
                            console.log("Error updating status !");
                          })
                      }}>
                      {
                        statuslist.map((data) => {
                          return (
                            <option name="statuslist" key={data[0]}>{data}</option>
                          )
                        })
                      }
                      {/* {console.log(data[0])} */}
                    </select>
                  </>
                  }</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {/* {getTodaysDate()} */}
    </div>
  )
}

export default Userhomepage