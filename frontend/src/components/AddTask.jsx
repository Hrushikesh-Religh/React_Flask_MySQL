import React from 'react'
import axios from 'axios'
import { useRef, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import s from './addTask.module.css'
//-----

function AddTask() {

    //states
    let [userdata, setUserdata] = useState([])
    let [title, setTitle] = useState("")
    let [description, setDescription] = useState("")
    let [assignto, setAssignto] = useState("")
    let [startdate, setStartdate] = useState("")
    let [enddate, setEnddate] = useState("")
    let [deadline, setDeadline] = useState("")
    let [taskstatus, setTaskstatus] = useState("")
    let [screenshot, setScreenshot] = useState("")
    //-----

    //variables
    let today = "";
    //-----

    //refs
    let msg = useRef()
    let sdate = useRef()
    let edate = useRef()
    let ddate = useRef()
    //-----

    //params
    let { user } = useParams()
    //-----

    //logs
    // console.log(title);
    // console.log(description);
    // console.log(assignto);
    // console.log(startdate);
    // console.log(enddate);
    // console.log(deadline);
    // console.log(taskstatus);
    // console.log(screenshot);
    //-----

    //useeffect hooks
    useEffect(() => {
        getTodaysDate();
        axios.get("http://localhost:5000/getusers")
            .then((res) => {
                setUserdata(res.data)
            })
            .catch(()=>{
                console.log("Error");
            })
    }, [])
    //------

    //functions

    //function to clear messages
    function clearMsg() {
        setTimeout(() => {
            msg.current.innerHTML = ""
        }, 4000);
    }

    //function to assign task
    function assignTask(e) {
        if (title == "" | description == "" | assignto == "") {
            msg.current.style = "color: var(--errsmsg)"
            msg.current.innerHTML = "Title, Description and Assign to are Mandatory!"
        }
        else if (enddate < startdate) {
            msg.current.style = "color: var(--errsmsg)"
            msg.current.innerHTML = "Enddate cannot be less than start date !"
        }
        else if (deadline < enddate) {
            msg.current.style = "color: var(--errsmsg)"
            msg.current.innerHTML = "Deadline cannot be less than end date !"
        }
        else {
            let payload = { title, description, assignto, startdate, enddate, deadline, taskstatus, screenshot }
            axios.post("http://localhost:5000/addtask", payload)
                .then(() => {
                    msg.current.style = "color: var(--successmsg)"
                    msg.current.innerHTML = "Task Assigned Successfully !"
                })
                .catch(() => {
                    msg.current.style = "color: var(--errsmsg)"
                    msg.current.innerHTML = "Error Assigning task !"
                    console.log("Error Assigning task !");
                })
        }
        e.preventDefault();
    }

    //function to get todays date
    function getTodaysDate(){
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        today = year + "-" + month + "-" + day;
        sdate.current.min = today
        edate.current.min = today
        ddate.current.min = today
    }
    //-----

    return (
        <div className={s.app}>
            <div className='subHeading'>
                Logged in as: {user}
            </div>

            <form action="" className={s.addtask}>

                <span className={s.heading}>Add Task</span>
                <div className={s.subHeading}>
                    Title: 
                    <input type="text" name='title' placeholder='Enter Title'
                    onChange={(e) => {
                            setTitle(e.target.value)
                    }} />
                </div>

                <div className={s.subHeading}>
                    Description: <br />
                    <textarea name="description" cols="30" rows="7"
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }} ></textarea>
                </div>

                <div className={s.assign}>
                    <span className={s.selecttask}>
                        Assign to:
                        <select name="selectUser"
                        onChange={(e) => {
                            if (e.target.value == "Select") {
                                setAssignto("")
                            } else {
                                setAssignto(e.target.value)
                            }
                        }}>
                            <option name="userlist">Select</option>
                            {
                                userdata.map((data) => {
                                    return (
                                        <option name="userlist" key={data[0]}>{data[1]}</option>
                                    )
                                })
                            }
                        </select>
                    </span>

                    <div className={s.date}>

                        <span>Start date: 
                            <input type="date" name='startDate' id='startdate' ref={sdate}
                            onChange={(e) => {
                                    setStartdate(e.target.value)
                            }} /></span>

                        <span>End date: 
                            <input type="date" name='endDate' ref={edate}
                            onChange={(e) => {
                                if (e.target.value < startdate) {
                                    msg.current.innerHTML = "End date should be greater than Start date!"
                                    clearMsg();
                                } else {
                                    setEnddate(e.target.value)
                                }
                            }} /></span>

                        <span>Deadline: 
                            <input type="date" name='deadline' ref={ddate}
                            onChange={(e) => {
                                if (e.target.value < startdate | e.target.value < enddate) {
                                    msg.current.innerHTML = "Deadline should be greater than Start date and End date!"
                                    clearMsg();
                                } else {
                                    setDeadline(e.target.value)
                                }
                            }} /></span>

                    </div>
                </div>

                <div className={s.taskstatus}>
                    Task Status:
                    <select name="taskStatus" className={s.select}
                    onChange={(e) => {
                        if (e.target.value == "Select") {
                            setTaskstatus("")
                        } else {
                            setTaskstatus(e.target.value)
                        }
                    }}>
                        <option name="statusList">Select</option>
                        <option name="statusList">Todo</option>
                        <option name="statusList">In Progress</option>
                        <option name="statusList">Ready For Test</option>
                        <option name="statusList">Done</option>
                    </select>
                </div>

                <div className={s.screenshot}>
                    Screenshot: 
                    <input type="file" accept='image/*'
                        onChange={(e) => {
                            let path = e.target.value
                            path = path.replace(/^.*\\/, "")
                            setScreenshot(path)
                        }} />
                </div><br />

                <div className={s.submit}>
                    <input type="submit" value='Assign Task' id={s.btn} onClick={assignTask} />
                </div>

                <div className='msg' ref={msg}>

                </div>
            </form>
        </div>
    )
}

export default AddTask