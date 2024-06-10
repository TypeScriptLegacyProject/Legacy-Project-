'use client'

import axios from "axios";
import { useEffect, useState } from "react"
import { useAuth } from "../auth"
import { useRouter } from "next/navigation";


export default function allproducts(){
 const [sellerProducts, setSellerProducts] = useState<any>([]);
 const { seller } = useAuth();
 const router=useRouter()
useEffect(() => {
    axios
      .get(`http://localhost:4000/api/seller/${seller.id}`)
      .then((res) => {
        console.log(res.data);
      setSellerProducts(res.data)
      console.log("kjefzkj",sellerProducts)

      })
      .catch((error) => console.error(error));
  }, [])

  return(
    <>
    <button onClick={()=>{router.push("/")}}>home</button>
    <button onClick={()=>{router.push("/addproduct")}}>add products</button>
    <div>
    {sellerProducts.map((product:any) => (
                <li key={product.id} className="product-item">
                  <h2 className="product-name">{product.name}</h2>
                  <img src={product.imgUrl}
                    alt="product"
                    className="product-image"
                  />
                </li>
              ))}
    </div>
    </>
  )

}