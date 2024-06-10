"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import "../styles/addProduct.css";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/page";

;

export default function AddProduct() {
  const [file, setFile] = useState<File | any>(null);
  const [url, setUrl] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("sport");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const router = useRouter();

  const uploadImage = () => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "exclusive") ;

    axios
      .post("https://api.cloudinary.com/v1_1/dcyeimdps/image/upload", form)
      .then((result) => {
        setUrl(result.data.secure_url);
        console.log(result.data.secure_url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const adding = () => {
    axios.post(`http://localhost:4000/api/products`, {
      name: name,
      category: category,
      description: description,
      price: price,
      imgUrl: url,
    })
    .then((res) => {
      console.log("adding", res);
      alert("you adding")
     router.push("/")
    })
    .catch((err) => {
      console.log(err);
    })
  };

  return (
   
   
    <div className="addProduct-container">

      <h2 className="addProduct-title"> <button className="returnn" onClick={()=>{router.push("/")}}>home</button> Create New Product For Sale <button  className="myprod" onClick={()=>{router.push("myproducts")}}>my products</button></h2>
      <p className="addProduct-subtitle">You can add product over here</p>
      <div className="addProduct-content">
        <div className="addProduct-left">
          <form className="addProduct-form">
            <fieldset className="addProduct-fieldset">
              <label className="addProduct-label">Product Name:</label>
              <input
                className="addProduct-input"
                type="text"
                name="productname"
                placeholder="Please enter your product name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="addProduct-fieldset">
              <label className="addProduct-label">Description:</label>
              <textarea
                className="addProduct-textarea"
                name="description"
                placeholder="Please enter your product description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </fieldset>
            <fieldset className="addProduct-fieldset">
              <label className="addProduct-label">Price:</label>
              <input
                className="addProduct-input"
                type="number"
                step="0.01"
                name="price"
                placeholder="Please enter your product price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="addProduct-fieldset">
              <label className="addProduct-label">Category:</label>
              <select
                className="addProduct-input addProduct-select"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value="sport">Sport</option>
                <option value="gaming">Gaming</option>
                <option value="phones">Phones</option>
                <option value="pcs">PCs</option>
                <option value="kitchen">Kitchen</option>
                <option value="fishing">Fishing</option>
              </select>
            </fieldset>
            <button
              className="addProduct-button addProduct-add-button"
              type="button"
              onClick={() => {
                adding();
              }}
            >
              Add Product
            </button>
          </form>
        </div>
        <div className="addProduct-center">
          <div className="addProduct-exclusive">
            <span className="addProduct-exclusive-red">Ex</span>
            <span className="addProduct-exclusive-black">clusive</span>
          </div>
        </div>
        <div className="addProduct-right">
          <div className="addProduct-upload-container">
            <label className="addProduct-label addProduct-upload-label">
              Product Image:
            </label>
            <div className="addProduct-image-preview">
              {url && (
                <Image
                  className="addProduct-uploaded-image"
                  src={url}
                  alt="Uploaded"
                  width={250}
                  height={250}
                />
              )}
            </div>
            <button
              className="addProduct-button addProduct-upload-button"
              type="button"
              onClick={() => {
                document.getElementById("fileInput")?.click();
              }}
            >
              Select
            </button>
            <input
              id="fileInput"
              className="addProduct-file-input"
              type="file"
              onChange={(e: any) => {
                setFile(e.target.files[0]);
              }}
            />
            <button
              className="addProduct-button addProduct-upload-button"
              onClick={() => {
                uploadImage();
              }}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  

  );
}