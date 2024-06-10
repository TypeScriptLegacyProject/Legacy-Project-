"use client"
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/oneprod.css"
import Navbar  from "../../components/navbar/page";
import { useAuth } from "../../auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function oneproduct(){


  const [produit,setproduit]=useState<any>({}) 
  const [quantity, setQuantity] = useState<number>(1)
  
  const pathname = usePathname();
 
  const id = pathname.slice(pathname.length - 1)
  const { user } = useAuth();


  const addToPanier = (id: any) => {
    const data = {
      UserId: user.id,
      productId: id,
    };

    axios
      .post("http://localhost:4000/api/panier/usercart", data)
      .then((res) => {
        console.log(res);
        toast.success("Item added to cart");
      })
      .catch((err) => {
        console.error(err);
        toast.info("Item already in cart");
      });
  };

useEffect(()=>{
    if(id){
        axios.get(`http://localhost:4000/api/products/${id}`).then((resp)=>{
            setproduit(resp.data)
           
          
        }).catch((err)=>{console.log(err)})
    }

},[id])

    return (
 
       

        <div>
            <Navbar/>
        <div className="new-product-page">
          <div className="new-product-container">
            <div className="new-product-images">
        
            </div>
            <div className="new-product-main-image">
              <img src={produit.imgUrl} alt="Main Product" />
            </div>
            <div className="new-product-details">
              <h1>{produit.name}</h1>
            
              <div className="new-product-options">
                
                <div className="new-product-colors">
                  <label>Colours:</label>
                  <button className="new-color-option new-color-red"></button>
                  <button className="new-color-option new-color-black"></button>
                </div>
                <div className="new-product-sizes">
                  <label>Size:</label>
                  <button className="new-size-option">XS</button>
                  <button className="new-size-option">S</button>
                  <button className="new-size-option">M</button>
                  <button className="new-size-option">L</button>
                  <button className="new-size-option">XL</button>
                </div>
                <div className="new-product-quantity">
                  <label>Quantity:</label>
                  <div className="new-quantity-controls">
                    <button
                      className="new-quantity-button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <input type="text" value={quantity} readOnly />
                    <button
                      className="new-quantity-button"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                className="new-buy-now-button"
                onClick={() => addToPanier(produit.id)}
              >
                Buy Now
              </button>
              <div className="new-delivery-info">
                <div>
                  Free Delivery{" "}
                  <span>Enter your postal code for Delivery Availability</span>
                </div>
                <div>
                  Return Delivery{" "}
                  <span>Free 30 Days Delivery Returns. Details</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div> </div>
        <ToastContainer />
      </div>
    );



}