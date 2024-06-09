"use client";
import "../../styles/navbar.css";
import { useAuth } from "../../auth";
import { useRouter } from "next/navigation";
import jwt,{JwtPayload} from "jsonwebtoken";

export default function Navbar() {
  const { logOut, token } = useAuth();
  const router = useRouter();

  const signOut = () => {
    logOut();
    router.push("/login");
  };


  const decodeToken = () => {
    if (token) {
      try {
        const decodedToken = jwt.decode(token) as JwtPayload | null;
        if (decodedToken && (decodedToken as JwtPayload).role) {
          return (decodedToken as JwtPayload).role;
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    return null;
  };

  
  const renderNavbarContent = () => {
    const role = decodeToken();
    if (role === "user") {
      return (
        <>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="/cart">Cart</a>
          </li>
          <li>
            <a href="/wishlist">Wishlist</a>
          </li>
          <li onClick={signOut}>
            <a>Log Out</a>
          </li>
        </>
      );
    } else if (role === "seller") {
      return (
        <>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li onClick={signOut}>
            <a>Log Out</a>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
        </>
      );
    }
  };

  return (
    <>
      <div id="topNav">
        <div className="midleText">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          <span>ShopNow</span>
        </div>
      </div>
      <div id="nav">
        <div className="logo">
          <a href="#">Exclusive</a>
        </div>
        <div className="MidleNav">
          <ul>{renderNavbarContent()}</ul>
        </div>
        <div className="rightNav">
          <div className="search">
            <input
              type="text"
              placeholder="What are you looking for?"
              name="search"
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="icons">
            <i className="fa-regular fa-heart"></i>
            {token && (
              <div className="dropdown ">
                <i
                  className="fa-solid fa-cart-shopping"
                  onClick={() => router.push("/")}
                ></i>
                <i className="fa-solid fa-user toggle"></i>
                <ul className="dropdown-menu">
                  <li onClick={() => router.push("/profile")}>
                    <i className="fa-regular fa-user"></i>
                    <span>Profile</span>
                  </li>
                  <li>
                    <i className="fa-solid fa-bag-shopping"></i>
                    <span>Orders</span>
                  </li>
                  <li onClick={signOut}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Log Out</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}