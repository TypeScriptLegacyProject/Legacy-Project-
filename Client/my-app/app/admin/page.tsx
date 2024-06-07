'use client'

import axios from "axios"
import { useEffect, useState } from "react"

export default function getall(){
const [total,settotal]=useState<number>()
const [datauser,setdatauser]=useState<any>([])
const [dataseller,setdataseller]=useState<any>([])

useEffect(()=>{
  axios.get(`http://localhost:4000/api/admin/Customer`)
  .then((response)=>{
    settotal(response.data.user.length+response.data.sellers.length)
    setdatauser(response.data.user)
    console.log(response.data.user);
    
    setdataseller(response.data.sellers)

  })
  .catch((err)=>{
    console.log(err);
    
  })
},[])
 function deletuser(id:any){
    axios.delete(`http://localhost:4000/api/users/${id}`)
    .then((res)=>{
        console.log("deleted");
        
    })
    .catch((err)=>{
        console.log(err);
        
    })
 }

return(
    <>
    <div>
    <div>
    <h2>Customer</h2>
    <h3>{total}</h3>
    </div>
    <div>
      {datauser.map((e:any)=>{
     return ( 
        <>
      <h2>{e.id}</h2>  
     <h2>{e.username}</h2>
     <h2>{e.email}</h2>
     <h2>{e.role}</h2>
     {/* <select > */}
            <button onClick={()=>{deletuser(e.id)}} >delet</button>
            {/* <option >change role</option>
            <option >Option 3</option> */}
          {/* </select> */}
     </>
    )
      })}  
      {dataseller.map((e:any)=>{
       return( 
       <>
       <h2>{e.id}</h2>  
       <h2>{e.username}</h2>
       <h2>{e.email}</h2>
       <h2>{e.role}</h2>
       </>
       )
      })}
    </div>
    </div>
    </>
)
}