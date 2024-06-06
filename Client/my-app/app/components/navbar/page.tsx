"use client";
import "../../styles/navbar.css";

export default function Navbar() {
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
          <a href="/home">Exclusive</a>
        </div>
        <div className="MidleNav">
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className="rightNav">
          <div className="search">
            <input
              type="text"
              placeholder="what are you looking for?"
              name="search"
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="icons">
            <i className="fa-regular fa-heart"></i>
            <i className="fa-solid fa-cart-shopping"></i>
            <div className="dropdown">
              <i className="fa-solid fa-user toggle"></i>
              <ul className="dropdown-menu">
                <li>
                  <i className="fa-regular fa-user"></i>
                  <span>Profile</span>
                </li>
                <li>
                  <i className="fa-solid fa-bag-shopping"></i>
                  <span>Orders</span>
                </li>
                <li>
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <span>Log Out</span>
                  <button>
                    <a href="/home"></a>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
