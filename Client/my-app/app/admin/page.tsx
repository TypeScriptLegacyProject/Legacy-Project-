'use client'

import axios from "axios"
import { error } from "console"
import { headers } from "next/headers"
import { useEffect, useState } from "react"

export default function getall(){
const [total,settotal]=useState<number>(0)
const [datauser,setdatauser]=useState<any>([])
const [dataseller,setdataseller]=useState<any>([])
const [products,setproducts]=useState<number>(0)
const [dataprodactus,setdataprodactus]=useState<any>([])
const [panier,setpanier]=useState<number>(0)
const [datapanier,setdatapanier]=useState<any>([])
const [view,setview]=useState<string>("customer")



const allcustomer=async ()=>{
  try{
  axios.get(`http://localhost:4000/api/admin/Customer`)
  .then((response)=>{
    settotal(response.data.user.length+response.data.sellers.length)
    setdatauser(response.data.user)
    console.log(response.data.user);
    
    setdataseller(response.data.sellers)

  })}
  catch(err){
    console.log(err);
    
  }
 }
const product = async ()=>{
  try{
    axios.get(`http://localhost:4000/api/products`)
    .then((response)=>{
      setproducts(response.data.length)
      setdataprodactus(response.data)
      
      setdataseller(response.data.sellers)
  })
}
catch(err){
  console.log(err);
}
}

const panie=async()=>{
  try{
    axios.get(`http://localhost:4000/api/panier/all`)
    .then((response)=>{
      setpanier(response.data.length)
      setdatapanier(response.data)
      console.log(response.data);
      
      
     
  })
}
catch(err){
  console.log(err);
}
}





useEffect(()=>{
 allcustomer()
 product()
 panie()
},[])


 const del=async(id:any)=>{
  try{
   await fetch(`http://localhost:4000/api/admin/del/${id}`,
   {method:"DELETE"})
    allcustomer()
  }
    catch(err){
        console.log(err);
        
    }
 }

const delprodact=async(id:any)=>{
  try{
   await fetch(`http://localhost:4000/api/products/${id}`,
   {method:"DELETE"})
    product()
  }
    catch(err){
        console.log(err);
        
    }
  }

  const delorder=async(id:any)=>{
    try{
     await fetch(`http://localhost:4000/api/panier/del/${id}`,
     {method:"DELETE"})
      panie()
    }
      catch(err){
          console.log(err);
          
      }
    }
 

 const changeview =()=>{
  if(view==="customer"){
     return(
    <>
    <table>
     <thead>
      <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action 1</th>
        <th>Action 2</th>
      </tr>
    </thead>
     <tbody>
      <>
     {datauser && datauser.map((e: any) => {
        return(<tr key={e.id}>
          <td>{e.id}</td>
          <td>{e.username}</td>
          <td>{e.email}</td>
          <td>{e.role}</td>
          <td>
            <button onClick={() => del(e.email)}>delete</button>
          </td>
          <td>
         <button onClick={async() => {
          const user=datauser.find((user:any) => user.id === e.id);
          console.log(user);
          
          del(user.email)
          try{
          const response=  await fetch(`http://localhost:4000/api/auth/register`,
           {method:"POST",
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
          email:user.email,
          username:user.username,
          password:user.password,
          role:"seller"
          })
           } )
           if(!response.ok){
            throw new Error("is filed")
           }
             allcustomer()
           }
             catch(err){
                 console.log(err);
                 
             }
          

         }
         

         }>
          
          
          
          
          change role</button>
       </td>
        </tr>)
      })}
    
      </>
      <>
     {dataseller && dataseller.map((e: any) => {return(
        <tr key={e.id}>
          <td>{e.id}</td>
          <td>{e.username}</td>
          <td>{e.email}</td>
          <td>{e.role}</td>
          <td>
            <button onClick={()=>{del(e.email)}}>delete</button>
             </td>
             <td>
         <button onClick={async() => {
          const seller=dataseller.find((seller:any) => seller.id === e.id);
          console.log(seller);
          
          del(seller.email)
          try{
          const response=  await fetch(`http://localhost:4000/api/auth/register`,
           {method:"POST",
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
          email:seller.email,
          username:seller.username,
          password:seller.password,
          role:"user"
          })
           } )
           if(!response.ok){
            throw new Error("is filed")
           }
             allcustomer()
           }
             catch(err){
                 console.log(err);
                 
             }
          

         }
         

         }>
          
          
          
          
          change role</button>
       </td>    
        </tr>)
      })}
      </>
      </tbody>
      </table>
    </>
    )}

else if(view==="users"){
  return(
 <>
 <table>
  <thead>
   <tr>
     <th>ID</th>
     <th>Username</th>
     <th>Email</th>
     <th>Role</th>
     <th>Action 1</th>
     <th>Action 2</th>
   </tr>
 </thead>
  <tbody>
   <>
  {datauser && datauser.map((e: any) => {
     return(<tr key={e.id}>
       <td>{e.id}</td>
       <td>{e.username}</td>
       <td>{e.email}</td>
       <td>{e.role}</td>
       <td>
         <button onClick={() => del(e.email)}>delete</button>
       </td>
       <td>
         <button onClick={async() => {
          const user=datauser.find((user:any) => user.id === e.id);
          console.log(user);
          
          del(user.email)
          try{
          const response=  await fetch(`http://localhost:4000/api/auth/register`,
           {method:"POST",
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
          email:user.email,
          username:user.username,
          password:user.password,
          role:"seller"
          })
           } )
           if(!response.ok){
            throw new Error("is filed")
           }
             allcustomer()
           }
             catch(err){
                 console.log(err);
                 
             }
          

         }
         

         }>
          
          
          
          
          change role</button>
       </td>
     </tr>)
   })}
 
   </>

   </tbody>
   </table>
 </>
 )}
 else if(view==="seller"){
  return(
 <>
 <table>
  <thead>
   <tr>
     <th>ID</th>
     <th>Username</th>
     <th>Email</th>
     <th>Role</th>
     <th>Action 1</th>
     <th>Action 2</th>
   </tr>
 </thead>
  <tbody>
  
   <>
  {dataseller && dataseller.map((e: any) => {return(
     <tr key={e.id}>
       <td>{e.id}</td>
       <td>{e.username}</td>
       <td>{e.email}</td>
       <td>{e.role}</td>
       <td>
         <button onClick={()=>{del(e.email)}}>delete</button>
          </td>
          <td>
         <button onClick={async() => {
          const seller=dataseller.find((seller:any) => seller.id === e.id);
          console.log(seller);
          
          del(seller.email)
          try{
          const response=  await fetch(`http://localhost:4000/api/auth/register`,
           {method:"POST",
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
          email:seller.email,
          username:seller.username,
          password:seller.password,
          role:"user"
          })
           } )
           if(!response.ok){
            throw new Error("is filed")
           }
             allcustomer()
           }
             catch(err){
                 console.log(err);
                 
             }
          

         }
         

         }>
          
          
          
          
          change role</button>
       </td>  
     </tr>)
   })}
   </>
   </tbody>
   </table>
 </>
 )}
  else if(view==="products") {
    return(
   <>
   <table>
    <thead>
     <tr>
       <th>ID</th>
       <th>Name</th>
       <th>Price</th>
       <th>Category</th>
       <th>Action</th>
     </tr>
   </thead>
    <tbody>
    
     <>
    {dataprodactus && dataprodactus.map((e: any) => {return(
       <tr key={e.id}>
         <td>{e.id}</td>
         <td>{e.name}</td>
         <td>{e.price}</td>
         <td>{e. category}</td>
         <td>
           <button onClick={()=>{delprodact(e.id)}}>delete</button>
            </td>
       </tr>)
     })}
     </>
     </tbody>
     </table>
   </>
   )}


   else if(view==="orders") {
    return(
   <>
   <table>
    <thead>
     <tr>
       <th>name prodact</th>
       <th>Name user</th>
       <th>email user</th>
       <th>Price prodact</th>
       <th>Category prodact</th>
       <th>Action</th>
     </tr>
   </thead>
    <tbody>
    
     <>
    {datapanier && datapanier.map((e: any) => {
    
      const user = datauser.find((user:any) => user.id === e.UserId);
      const product = dataprodactus.find((product:any) => product.id === e.productId)
      if(product && user)
      return(
     <>
     
      
       
       <tr key={e.id}>
         <td>{product.name}</td>
         <td>{user.username}</td>
         <td>{user.email}</td>
         <td>{product.price}</td>
         <td>{product.category}</td>
         <td>
           <button onClick={()=>{delorder(product.id)}}>delete</button>
            </td>
       </tr>
       </>
      )
     })}
     </>
     </tbody>
     </table>
   </>
   )}
   else if(view==="corbe"){
    return(
      <div>
        
      </div>
    )
   }

 }



 

return(
    <>
    <div>
    <div>
    <h3>Customer</h3>
    <h3>{total}</h3>
    </div>
    <div>
    <h3>products</h3>
    <h3>{products}</h3>
    </div>
    <div>
    <h3>orders</h3>
    <h3>{panier}</h3>
    </div>
  <div>{changeview()}</div>
 
   <h2 onClick={()=>{
    setview("users")
   }}>users</h2>
   <h2 onClick={()=>{
    setview("products")
   }}>products</h2>
   <h2 onClick={()=>{
    setview("seller")
   }}>sellers</h2>
   <h2 onClick={()=>{
    setview("customer")
   }}>Customer</h2>
    </div>
    <h2 onClick={()=>{
    setview("orders")
   }} >orders</h2>
   <h2  onClick={()=>{
    setview("corbe")
   }}
   >les corbes</h2>
    </>
)
}
