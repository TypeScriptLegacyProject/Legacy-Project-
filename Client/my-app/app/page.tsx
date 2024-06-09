"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/navbar/page";
import Image from "next/image"

export default function Home() {
  const [prod, setProd] = useState<any[]>([]);
  const [best, setBest] = useState<any[]>([]);
  const [flash, setFlash] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bestSellerResponse = await axios.get(`http://localhost:4000/api/products/condition/best seller`);
        setBest(bestSellerResponse.data);

        const flashSellsResponse = await axios.get(`http://localhost:4000/api/products/condition/flash sells`);
        setFlash(flashSellsResponse.data);

        const productsResponse = await axios.get(`http://localhost:4000/api/products`);
        setProd(productsResponse.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="header">
        <div className="sideBar">
          <ul>
            <li> Men Clothing</li>
            <li> Women Clothing</li>
            <li>Electronics</li>
            <li>Medicine</li>
            <li>Sport</li>
            <li>Toys</li>
            <li>Health And Beauty</li>
            <li>Groceries</li>
            <li>Pets</li>
          </ul>
        </div>
      </div>

      <h2>Flash Sells</h2>
      <div className="grid-container">
        {flash.map((el) => (
          <div
            key={el.id}
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
                <span>ADD TO CART</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Categories</h2>
      
      <h2>Best Seller</h2>
      <div className="grid-container">
        {best.map((el) => (
          <div
            key={el.id}
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
                <span>ADD TO CART</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Explore Our Products</h2>
      <div className="grid-container">
        {prod.map((product) => (
          <div key={product.id} className="container">
            <div className="overlay">
              <div className="items" />
              <div className="items head">
                <p>{product.name}</p>
                <Image src={product.imgUrl} alt={product.name} />
                <hr />
              </div>
              <div className="items price">
                <p className="old">$699</p>
                <p className="new">${product.price}</p>
              </div>
              <div className="items cart">
                <i className="fa fa-shopping-cart" />
                <span>ADD TO CART</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
