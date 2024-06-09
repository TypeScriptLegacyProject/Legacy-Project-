"use client";
import axios from "axios";
import { useAuth } from "../auth";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/page";
import "../styles/wishlist.css";
import  { useEffect, useState } from "react";
import Footer from "../components/footer/page";
export default function wishlist () {

    const [sel3a, setSel3a] = useState<any>([]);
    const [refre, setRefre] = useState<Boolean>(false);
    const { user } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      axios
        .get(`http://localhost:4000/api/panier/usercart/${user.id}`)
        .then((res) => {
          console.log(res.data[0].products, "sel3a");
          setSel3a(res.data[0].products);
        })
        .catch((err) => {
          console.error(err);
        });
    }, [refre, user.id]);
  
    
    const remove = (productId:any) => {
      axios
        .delete(`http://localhost:4000/api/panier/del/${productId}`)
        .then((response) => {
          console.log(response);
          setRefre(!refre);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    return (
      <div>
       <Navbar/>
       <div className="favorites-container">
        <table className="favorites-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sel3a.map((item:any, index:number) => (
              <tr key={index}>
                <td className="product-details">
                  <img src={item.imgUrl} alt={item.name} className="product-image" />
                  <span className="product-name"><b>{item.name}</b></span>
                </td>
                <td><b>{item.price} $</b></td>
                <td>
                  <button onClick={() => remove(item.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="favorites-actions">
          <button className="return-shop" onClick={() => router.push("/home")}>Return to Shop</button>
        </div>
      </div>
        <Footer/>
      </div>
    );
  };
  