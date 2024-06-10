"use client";
import axios from "axios";
import { useAuth } from "../auth";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/page";
import Modal from "../components/confirmation/page";
import "../styles/cart.css";
import { useEffect, useState } from "react";
import Footer from "../components/footer/page";

export default function Panier() {
  const [sel3a, setSel3a] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [refre, setRefre] = useState<Boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<() => void>(() => {});
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/panier/usercart/${user.id}`)
      .then((res) => {
        console.log(res.data[0].products, "sel3a");
        setSel3a(res.data[0].products);
        const sum = res.data[0].products.reduce((acc: any, product: any) => {
          const productTotal = product.price * (product.quantity || 1);
          return acc + productTotal;
        }, 0);
        setTotal(sum);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refre, user.id]);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedProducts = [...sel3a];
    updatedProducts[index].quantity = newQuantity;

    const newTotal = updatedProducts.reduce((acc, product) => {
      const productTotal = product.price * (product.quantity || 1);
      return acc + productTotal;
    }, 0);

    setSel3a(updatedProducts);
    setTotal(newTotal);
  };

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

  const remove = (productId: any) => {
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

  const proceedToCheckout = () => {
    localStorage.setItem("toastMessage", "Thank you for shopping with Exclusive! Your order is on its way.");
    router.push("/");
  };

  return (
    <div>
      <Navbar />
      <div className="panier-container">
        <div className="breadcrumb"></div>
        <h2>Cart</h2>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {sel3a.map((el: any, index: number) => (
              <tr key={el.id}>
                <td>
                  <img src={el.imgUrl} alt={el.name} className="product-image" />
                  {el.name}
                </td>
                <td>${el.price}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={el.quantity || 1}
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                    className="quantity-input"
                  />
                </td>
                <td>${el.price * (el.quantity || 1)}</td>
                <td
                  onClick={() =>
                    confirmAction(
                      () => remove(el.id),
                      "Confirm Delete",
                      `Are you sure you want to delete ${el.name} from the cart?`
                    )
                  }
                >
                  X
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="return-button" onClick={() => router.push("/")}>
          Return To Shop
        </button>
        <div className="coupon-container">
          <input type="text" placeholder="Coupon Code" className="coupon-input" />
          <button className="apply-coupon">Apply Coupon</button>
        </div>
        <div className="cart-total">
          <h3>Cart Total</h3>
          <p>Subtotal: ${total}</p>
          <p>Shipping: Free</p>
          <p>Total: ${total}</p>
          <button className="checkout-button" onClick={proceedToCheckout}>
            Proceed to checkout
          </button>
        </div>
      </div>
      <Footer />
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
