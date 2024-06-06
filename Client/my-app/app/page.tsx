"use client";
import { useEffect, useState } from "react";
import axios from "axios"

export default function(){
    const [prod, setProd] = useState<any[]>([]);
   
    
useEffect(function(){
  axios.get("http://localhost:4000/api/products")
  .then((resp)=>{console.log("hatha"),setProd(resp.data)})
  .catch((err)=>{console.log(err)})
},[])
return ( <div>
    <h1 className='top-prod'>Top Products</h1> 
      <div className="top-label2" style={{ display: 'flex', alignItems: 'center' }}>
<img src="https://www.clker.com/cliparts/3/R/3/7/W/R/orange-vertical-rectangle-md.png" alt="IPS LCD Gaming Monitor" style={{ width: '20px', height: 'auto', marginRight: '10px' }} />
<h2 className='top-subtitle'>This Month</h2>
</div>
 <div className="flash-sales">
   {prod.map((el) => (
     <div className="products" >
       <div className="product">
         <img src={el.imgUrl} alt={el.name} />
         <span className="discount"></span>
         <h3>{el.name}</h3>
         
         <span className="icon-heart2" >❤️</span>
         <p className='price-color'><span>${el.price}</span></p>
       
       </div>
     </div>
   ))}
 </div>
</div>



)
}