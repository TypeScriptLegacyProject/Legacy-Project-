"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import "../styles/addProduct.css";

export default function AddProduct() {
  const [file, setFile] = useState<File | any>(null);
  const [url, setUrl] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("sport");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setFile(e.target.files[0]);
  //     uploadImage(e.target.files[0]);
  //   }
  // };

  const uploadImage = () => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "exclusive");

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
      name:name,
      category:category,
      description:description,
      price:price,
      imgUrl: url,
    })
    .then((res)=>{
      console.log("adding",res);
      
    })
    .catch((err)=>{
      console.log(err);
      
    })
  };

  return (
    <div className="addProduct-container">
      <h2 className="addProduct-title">Create New Product For Sale</h2>
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
                  width={150}
                  height={150}
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
              Upload
            </button>
            <input
              id="fileInput"
              className="addProduct-file-input"
              type="file"
              onChange={(e:any)=>{
                setFile(e.target.files[0])
          
              }}
             
            />
            <button  onClick={()=>{
                uploadImage()
              }}>select</button>
          </div>
        </div>
      </div>
    </div>
  );
}