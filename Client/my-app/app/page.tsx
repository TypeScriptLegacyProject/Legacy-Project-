"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/navbar/page";
import { useAuth } from "./auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/home.css";
import CarouselComponent from "./components/carousel/page"
import { useRouter } from "next/navigation";

export default function Home() {
  const [prod, setProd] = useState<any[]>([]);
  const [best, setBest] = useState<any[]>([]);
  const [flash, setFlash] = useState<any[]>([]);
  const [filteredProd, setFilteredProd] = useState<any[]>([]); 
  const [category, setCategory] = useState<string>("All");
  const { user } = useAuth();
const router=useRouter()



  const oneprod=(id:number)=>{
    router.push(`/oneproduct/${id}`)
  }

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

  const addToWishlist = (item: any, image: any, name: any, price: any) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    let itemExists = false;

    for (let i = 0; i < wishlist.length; i++) {
      if (wishlist[i].item === item) {
        itemExists = true;
        break;
      }
    }

    if (!itemExists) {
      wishlist.push({ item, image, name, price });
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      toast.success("Item added to wishlist");
    } else {
      toast.info("Item already in wishlist");
    }

    console.log(wishlist);
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
        setFilteredProd(response.data)
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (category === "All") {
      setFilteredProd(prod);
    } else {
      const filtered = prod.filter((product) => product.category === category);
      setFilteredProd(filtered);
    }
  }, [category, prod])

 

  return (
    <div>
      <Navbar />
      <CarouselComponent/>
      <div style={{ display: "flex" }}>
        <div className="sideBar">
          <ul>
            <h1>Categories</h1>
            <li onClick={() => setCategory("All")}>All</li>
            <li onClick={() => setCategory("gaming")}>Gaming</li>
            <li onClick={() => setCategory("sport")}>Sport</li>
            <li onClick={() => setCategory("phones")}>Phones</li>
            <li onClick={() => setCategory("pcs")}>PCs</li>
            <li onClick={() => setCategory("kitchen")}>Kitchen</li>
            <li onClick={() => setCategory("fishing")}>Fishing</li>
          </ul>
        </div>
        <div style={{ flex: 1, padding: "20px" }}>
          <h2>Explore Our Products</h2>
          <div className="grid-container">
            {filteredProd.map((product) => (
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
                    <span className="icon-heart2" onClick={() => { addToWishlist(product.id, product.imgUrl, product.name, product.price) }}>
                      ❤️
                    </span>
                  </div>
                  <button className="buttonn" onClick={()=>{oneprod(product.id)}}>see details</button>
                </div>
              </div>
            ))}
          </div>
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
                    <span className="icon-heart2" onClick={() => { addToWishlist(el.id, el.imgUrl, el.name, el.price) }}>
                      ❤️
                    </span>
                  </div>
                  <button className="buttonn" onClick={()=>{oneprod(el.id)}}>see details</button>
                </div>
              </div>
            ))}
          </div>
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
                    <span className="icon-heart2" onClick={() => { addToWishlist(el.id, el.imgUrl, el.name, el.price) }}>
                      ❤️
                    </span>
                  </div>
                  <button className="buttonn" onClick={()=>{oneprod(el.id)}}>see details</button>
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
