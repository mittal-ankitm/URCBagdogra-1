import React,{useState,useEffect,useContext} from 'react'
import {usercontext} from '../App'
import {serverurl} from '../config'
import {Link,useHistory} from 'react-router-dom'
import DatePicker from 'react-date-picker'
import "../stylesheet/windowslot.css";
import Loading from './loading'

const WindowSlot= ()=>{

   const [data,setdata]=useState([])
   const {state,dispatch}=useContext(usercontext)
   const [date,setdate]=useState()
   const [dateshow,setdateshow]=useState()
   const [time,settime]=useState("")
   const history=useHistory()
   const [msg,setmsg]=useState("")
   const [loading,setloading]=useState(false)


   useEffect(() => {
      fetch(serverurl+'/sys/getuserinfo',{
         method:"get",
         headers:{
            Authorization:"Bearer "+localStorage.getItem("token"),
         }
      }).then(res=>res.json())
      .then(result=>{
         if(!result.data.userslot){
            history.push('/info/slrestrict')
         }
         else if(!result.data.slot){
            history.push('info/slclose')
         }
         else{
            setloading(true)
         }
      }).catch(err=>{
         history.push('/')
      })
   },[])

const getmindate=()=>{
   let dt=new Date();
   dt.setDate(dt.getDate()+1);
   return dt;
}
 
const getdate=()=>{
   settime("")

   if(!date){
      setmsg("choose date")
      return false
   }else{
      setmsg("")
   }
   setloading(false)
   fetch(`${serverurl}/timeslot/getwindowslotuser`,{
      method:"post",
      headers:{
         "Content-Type":"application/json",
         "Authorization":"Bearer "+localStorage.getItem("token")
      },
      body:JSON.stringify({
         date:date.toDateString()
      })
   }).then(res=>res.json())
   .then(result=>{
       setdata(result.timeslot)
       if(result.timeslot[0]){
          settime(result.timeslot[0]._id)
       }
       setdateshow(date)
      setloading(true)
      console.log(result)
   }).catch(err=>{
      console.log(err)
      setloading(true)
      setmsg("error loading")
   })
} 

const submitorder=()=>{
   if(!time) return 0;
   if(!date){
      setmsg("choose date")
      return false
   }else{
      setmsg("")
   }
   setloading(false)
   fetch(`${serverurl}/windoworders/placeorder`,{
      method:"post",
      headers:{
         "Content-Type":"application/json",
         "Authorization":"Bearer "+localStorage.getItem("token")
      },
      body:JSON.stringify({
         timeslotid:time
      })
   }).then(res=>res.json())
   .then(result=>{
       console.log(result)
       history.push(`/windowfinal/${result.id}`)
   }).catch(err=>{
      console.log(err)
      setloading(true)
      setmsg("error loading")
      settime("")
   })
}

const convert=(i)=>{
   var c=""
   if(i<12) c="AM"
   else{c="PM";if(i>12) i=i-12;}
   if(i==0.5) return "12.30-1.00 PM"
if(i*10%10==0){
   return Math.floor(i)+".00-"+(Math.floor(i))+".30"+c
}else{
   return Math.floor(i)+".30-"+(Math.floor(i)+1)+".00"+c
}
}

    return(
        <div className='main-windowslot'>
            
            <h1>Welcome to URC Bagdogra Online Token Issuing System</h1>
            <br></br>
 <br></br>
 <br></br>
 
 
 
            <hr></hr>
            <div>{msg}</div>
            {loading?<div className="timeslot-window-container">
                <div>Choose a Date to select a time slot</div>
                <div className="time">
                <DatePicker value={date} minDate={getmindate()} onChange={(dt)=>setdate(dt)} />
                <br></br>
                <button className='windowslot-button' onClick={()=>getdate()}>check</button>
                <div className='sel'>{dateshow?dateshow.toDateString():""}</div>
               {data.length!=0? <select className='sel' value={time} onChange={(e)=>settime(e.target.value)}>
                    {
                        data?
                        data.map((item, index)=>{
                            return(
                                <option key={index} value={item._id}>{convert(item.start)}</option>
                            )
                        })
                        :<option></option>
                    }
                </select>:<div></div>
               }
               </div>
                {data.length==0&&loading?<div>no slot availaible on this date</div>:<div></div>}

                {time? <button className="windowslot-button" onClick={()=>{if(window.confirm('are you sure, you want to book the slot?')){submitorder()}}}>book slot</button>:<span></span>}
                </div>:<Loading />
            }
            <br></br>
            <br></br>
            <br></br>
            
            
            
            
        </div>
    )
}

export default WindowSlot