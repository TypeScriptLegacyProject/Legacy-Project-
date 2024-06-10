"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/navbar/page";
import { useAuth } from "./auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/home.css";

export default function Home() {
  const [prod, setProd] = useState<any[]>([]);
  const [best, setBest] = useState<any[]>([]);
  const [flash, setFlash] = useState<any[]>([]);
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
      });
  };

  const wish = (id: any) => {
    const data = {
      UserId: user.id,
      productId: id,
    };

    axios
      .post("http://localhost:4000/api/panier/usercart", data)
      .then((res) => {
        console.log(res);
        toast.success("Item added to wishlist");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const toastMessage = localStorage.getItem("toastMessage");
    if (toastMessage) {
      toast.success(toastMessage);
      localStorage.removeItem("toastMessage");
    }

    axios
      .get(`http://localhost:4000/api/products/condition/Best Seller`)
      .then((response) => {
        console.log("Best Seller Products:", response.data);
        setBest(response.data);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get(`http://localhost:4000/api/products/condition/Flash Sales`)
      .then((response) => {
        console.log("Flash Sales Products:", response.data);
        setFlash(response.data);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get(`http://localhost:4000/api/products`)
      .then((response) => {
        setProd(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <div className="sideBar">
          <ul>
            <li>Man's Clothing</li>
            <li>Women's Clothing</li>
            <li>Electronics</li>
            <li>Medecine</li>
            <li>Sport</li>
            <li>Toys</li>
            <li>Health And Beauty</li>
            <li>Groceries</li>
            <li>Pets</li>
          </ul>
        </div>
        <div style={{ flex: 1, padding: "20px" }}>
          <h2>Flash Sales</h2>
          <div className="grid-container">
            {flash.map((el) => (
              <div key={el.id} className="container">
                <div
                  style={{
                    background: `url(${el.imgUrl})`,
                    backgroundSize: "cover",
                    height: "200px",
                    width: "100%",
                    borderRadius: "10px",
                  }}
                ></div>
                <div className="overlay">
                  <div className="items head">
                    <p>{el.name}</p>
                  </div>
                  <div className="items price">
                    <p className="old">$699</p>
                    <p className="new">${el.price}</p>
                  </div>
                  <div className="items cart">
                    <button className="button" onClick={() => addToPanier(el.id)}>
                      ADD TO CART
                    </button>
                    <span className="icon-heart2" onClick={() => wish(el.id)}>
                      ❤️
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2>Categories</h2>
          {/* Add categories display here if needed */}

          <h2>Best Seller</h2>
          <div className="grid-container">
            {best.map((el) => (
              <div key={el.id} className="container">
                <div
                  style={{
                    background: `url(${el.imgUrl})`,
                    backgroundSize: "cover",
                    height: "200px",
                    width: "100%",
                    borderRadius: "10px",
                  }}
                ></div>
                <div className="overlay">
                  <div className="items head">
                    <p>{el.name}</p>
                  </div>
                  <div className="items price">
                    <p className="old">$699</p>
                    <p className="new">${el.price}</p>
                  </div>
                  <div className="items cart">
                    <button className="button" onClick={() => addToPanier(el.id)}>
                      ADD TO CART
                    </button>
                    <span className="icon-heart2" onClick={() => wish(el.id)}>
                      ❤️
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2>Explore Our Products</h2>
          <div className="grid-container">
            {prod.map((product) => (
              <div key={product.id} className="container">
                <div
                  style={{
                    background: `url(${product.imgUrl})`,
                    backgroundSize: "cover",
                    height: "200px",
                    width: "100%",
                    borderRadius: "10px",
                  }}
                ></div>
                <div className="overlay">
                  <div className="items head">
                    <p>{product.name}</p>
                  </div>
                  <div className="items price">
                    <p className="old">$699</p>
                    <p className="new">${product.price}</p>
                  </div>
                  <div className="items cart">
                    <button className="button" onClick={() => addToPanier(product.id)}>
                      ADD TO CART
                    </button>
                    <span className="icon-heart2" onClick={() => wish(product.id)}>
                      ❤️
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}