'use client'


export default function Navbar(){
  
    return ( <>
      
        <div>
          <div >
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            <span>ShopNow</span>
          </div>
        </div>
        <div >
          <div >
            <a href="/home" >Exclusive</a>
          </div>
          <div >
            <ul>
              <li>
                <a >Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                
              </li>
            </ul>
          </div>
          <div >
            <div >
              <input
                type="text"
                placeholder="what are you looking for?"
                name="search"
              />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div >
              <i className="fa-regular fa-heart"></i>
              <i
                className="fa-solid fa-cart-shopping"
              
              ></i>
             
                <div >
                  <i className="fa-solid fa-user toggle"></i>
                  <ul >
                    <li >
                      <i className="fa-regular fa-user"></i>
                      <span>Profile</span>
                    </li>
                    <li>
                      <i className="fa-solid fa-bag-shopping"></i>
                      <span>Orders</span>
                    </li>
                    <li >
                      <i className="fa-solid fa-right-from-bracket"></i>
                      <span>Log Out</span>
                      <button ><a href="/home"> </a></button>
                    </li>
                  </ul>
                </div>
              
            </div>
          </div>
        </div>
      </>
     
    );
  }