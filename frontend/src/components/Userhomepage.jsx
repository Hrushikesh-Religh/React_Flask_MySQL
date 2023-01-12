import React from 'react'
import axios from 'axios'
import { useRef, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import s from './userhomepage.module.css'
//-----

function Userhomepage() {

  //states
  let [userdata, setUserdata] = useState([])
  let [dateloaded, setDateloaded] = useState("")
  //-----
  
  //refs
  let deadline = useRef()
  //-----
  
  //navs
  let nav = useNavigate()
  //-----
  
  //params
  let { user } = useParams()
  //-----
  
  //variables
  let today = ""
  let statuslist = ["Todo", "In Progress", "Ready For Test", "Done"]
  //-----

  //logs
  // console.log(userdata);
  //-----

  //useeffects
  useEffect(() => {
    axios.get(`http://localhost:5000/getuserdata?username=${user}`)
      .then((res) => {
        setUserdata(res.data)
        console.log("Data retreived !");
        console.log(userdata)
        getTodaysDate()
        setDateloaded(res.data[7])
      })
      .catch(() => {
        console.log("Error retreiving data !");
      })
  }, [])
  //-----

  //functions
  //function to get todays date
  function getTodaysDate(){
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    today = year + "-" + month + "-" + day;
}
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
                  <td>{data[4] ? data[4] : '-'}</td>
                  <td>{data[5] ? data[5] : '-'}</td>
                  <td ref={deadline}>{data[6] ? data[6] : '-'}</td>
                  <td>{data[7] ? data[7] : '-'}</td>
                  <td>{
                    <>
                    <select name="selectstatus" defaultValue={data[7]}
                    onChange={(e) => {
                      let newstatus = e.target.value
                      let id = data[0]
                      let payload = { newstatus, id }
                      axios.post("http://localhost:5000/updatestatus", payload)
                        .then(() => {
                          console.log("Status Updated ✔");
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

                    </select>
                  </>
                  }</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Userhomepage