import React,{useState,useEffect,useContext} from 'react'
import {usercontext} from '../../App'
import {serverurl} from '../../config'
import {Link, useParams} from 'react-router-dom'
import ProductNavBar from '../productnav'
import Loading from '../loading'
const Productdetails= ()=>{

   const [data,setdata]=useState([])
   const {productid}=useParams()
   const [msg,setmsg]=useState("")
   const {state,dispatch}=useContext(usercontext)


    useEffect(()=>{
        fetch(`${serverurl}/products/${productid}`,{
            method:"get",
            headers:{
               Authorization:"Bearer "+localStorage.getItem("token"),
            }
         }).then(res=>res.json())
         .then(result=>{
            setdata(result)
         })
    },[])


return(

   <div className='main'>
   <ProductNavBar />
   <div class='headt'> product details </div>

    {
        data?<div>
            <div><img src={data.image} height='100px' width='100px' /></div>
                <div>name: {data.name}</div>
                <div>size: {data.size}</div>
                <div>price: {data.price}</div>
                <div>quantity: {data.quantity}</div>
                <div>max Quantity: {data.maxQuantity}</div>
                <div>category: {data.category}</div>
                <div>percent: {data.onlinePercentage}</div>
                <Link to={`/editproduct/${data._id}`}><button>edit product</button></Link>

        </div>:
        <div>
           <Loading />
        </div>
    }
   </div>

)

}

export default Productdetails