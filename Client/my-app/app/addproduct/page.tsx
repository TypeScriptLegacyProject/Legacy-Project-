"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import "../styles/addProduct.css";

export default function AddProduct() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const uploadImage = () => {
    if (!file) {
      console.log("No file selected");
      return;
    }

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
    axios.post(`http://localhost:4000/api/products`);
  };

  return (
    <div className="NewProduct">
      <h2>Create New Product For Sale</h2>
      <form>
        <fieldset>
          <label className="label">Product Name:</label>
          <input
            className="input"
            type="text"
            name="productname"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </fieldset>
        <fieldset>
          <label className="label">Product Image:</label>
          <div className="image-input-container">
            <input
              className="input file-input"
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                }
              }}
            />
            {url && <img className="small-image" src={url} alt="Uploaded" />}
            <button
              className="button upload-button"
              type="button"
              onClick={uploadImage}
            >
              Upload!
            </button>
          </div>
        </fieldset>
        <fieldset>
          <label className="label">Description:</label>
          <textarea
            className="textarea"
            name="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </fieldset>
        <fieldset>
          <label className="label">Price:</label>
          <input
            className="input"
            type="number"
            step="0.01"
            name="price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </fieldset>
        <fieldset>
          <label className="label">Category:</label>
          <select
            className="input"
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
          className="button"
          type="button"
          onClick={(e) => {
            adding();
            e.preventDefault();
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
