"use client";
import { useEffect, useState } from "react";
import axios from "axios"
import Navbar from "./components/navbar/page";

export default function(){
    const [prod, setProd] = useState<any[]>([]);
    const [best, setBest] = useState<any[]>([]);
  const [flash, setFlash] = useState<any[]>([]);
    
    useEffect(() => {
      axios
        .get(`http://localhost:4000/api/products/condition/best seller`)
        .then((response) => {
          setBest(response.data);
        })
        .catch((err) => {
          console.error(err);
        }),
        axios
          .get(`http://localhost:4000/api/products/condition/flash sells`)
          .then((response) => {
            setFlash(response.data);
          })
          .catch((err) => {
            console.error(err);
          }),
          axios
          .get(`http://localhost:4000/api/products`)
          .then((response) => {
            setProd(response.data);
          })
          .catch((err) => {
            console.error(err);
          })

    }, []);
    return (
      <div>
       <Navbar/>
        <div className="header">
          <div className="sideBar">
            <ul>
              <li>Man's Clothing</li>
              <li>Women's Clothing </li>
              <li> Electronics</li>
              <li>Medecine</li>
              <li>Sport</li>
              <li>toys</li>
              <li>Health And Beauty</li>
              <li>Grociries</li>
              <li>Pets</li>
            </ul>
          </div>
        
        </div>
  
        <h2>flash Sells</h2>
        <div className="grid-container">
          {flash.map((el) => {
            return (
              <div
                className="container"
                style={{
                  background: `url(${el.imgUrl})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="overlay">
                  <div className="items" />
                  <div className="items head">
                    <p>{el.name}</p>
                    <hr />
                  </div>
                  <div className="items price">
                    <p className="old">$699</p>
                    <p className="new">${el.price}</p>
                  </div>
                  <div className="items cart">
                    <i className="fa fa-shopping-cart" />
                    <span
                     
                    >
                      ADD TO CART
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <h2>categories</h2>
        
        </div>
        <div>
          <h2>Best Seller</h2>
          <div className="grid-container">
            {best.map((el) => {
              return (
                <div
                  className="container"
                  style={{
                    background: `url(${el.imgUrl})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="overlay">
                    <div className="items" />
                    <div className="items head">
                      <p>{el.name}</p>
                      <hr />
                    </div>
                    <div className="items price">
                      <p className="old">$699</p>
                      <p className="new">${el.price}</p>
                    </div>
                    <div className="items cart">
                      <i className="fa fa-shopping-cart" />
                      <span
                       
                      >
                        ADD TO CART
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <h2>explore our products</h2>
          <div className="grid-container">
            {prod.map((product) => {
              return (
                <div
               className="container"
                
                >
                  <div className="overlay">
                    <div className="items" />
                    <div className="items head">
                      <p>{product.name}</p>
                      <img src={product.imgUrl} alt="" />
                      <hr />
                    </div>
                    <div className="items price">
                      <p className="old">$699</p>
                      <p className="new">${product.price}</p>
                    </div>
                    <div className="items cart">
                      <i className="fa fa-shopping-cart" />
                      <span>
                        ADD TO CART
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <br />
        <br />
        <br />
        <div>
         
        </div>
      </div>
    );
}