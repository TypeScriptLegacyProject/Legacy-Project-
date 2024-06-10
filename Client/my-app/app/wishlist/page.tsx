"use client";
import axios from "axios";
import { useAuth } from "../auth";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/page";
import Modal from "../components/confirmation/page"
import "../styles/wishlist.css";
import  { useEffect, useState } from "react";
import Footer from "../components/footer/page";

export default function wishlist () {
  const [sel3a, setSel3a] = useState<any>([]);
  const [refre, setRefre] = useState<Boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<() => void>(() => {});
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
     const stored=localStorage.getItem('wishlist')
     if(stored){
      const items = JSON.parse(stored) || [];
    setSel3a(items)
    
     }
     console.log(localStorage.getItem('wishlist'))
    
  }, []);

  const confirmAction = (action: () => void, title: string, message: string) => {
    setModalAction(() => action);
    setModalTitle(title);
    setModalMessage(message);
    setShowModal(true);
  };

  const handleConfirm = () => {
    modalAction();
    setShowModal(false);
  };

  const remove = (index:any) => {
   
    const updatedFavorites = [...sel3a.slice(0, index), ...sel3a.slice(index + 1)];
    setSel3a(updatedFavorites);
    localStorage.setItem('wishlist', JSON.stringify(updatedFavorites));
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
                  <img src={item.image} alt={item.name} className="product-image" />
                  <span className="product-name"><b>{item.name}</b></span>
                </td>
                <td><b>{item.price} $</b></td>
                <td>
                  <button onClick={() => confirmAction(() => remove(index), "Confirm Delete", `Are you sure you want to delete ${item.name} from the wishlist?`)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="favorites-actions">
          <button className="return-shop" onClick={() => router.push("/home")}>Return to Shop</button>
        </div>
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        title={modalTitle}
        message={modalMessage}
      />
    </div>
  );
}
