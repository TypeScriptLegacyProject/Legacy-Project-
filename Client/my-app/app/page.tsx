"use client";
import { useEffect, useState } from "react";
import axios from "axios"
import Image from "next/image";

export default function Home(){
    const [prod, setProd] = useState<any[]>([]);
   
    
useEffect(function(){
  axios.get("http://localhost:4000/api/products")
  .then((resp)=>{console.log("hatha"),setProd(resp.data)})
  .catch((err)=>{console.log(err)})
},[])
return ( <div>
    <h1 className='top-prod'>Top Products</h1> 
      <div className="top-label2" >
<h2 className='top-subtitle'>This Month</h2>
</div>
 <div className="flash-sales">
   {prod.map((el) => {
return(
    <>
     <div className="products" >
       <div className="product">
         <Image src={el.imgUrl} alt={el.name} />
         <span className="discount"></span>
         <h3>{el.name}</h3>
         
         <span className="icon-heart2" >❤️</span>
         <p className='price-color'><span>${el.price}</span></p>
       
       </div>
     </div>
     </>)
   })}
 </div>
</div>



)
}