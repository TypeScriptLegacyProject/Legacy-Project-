"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const AddProduct: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [category, setcategory] = useState<string>("");
  const [description, setdescription] = useState<string>("");
  const [price, setprice] = useState<string>("");
  

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
const adding=()=>{

    axios.post(`http://localhost:4000/api/products`)
}

  return (
    <div>
      <div>
        <div></div>
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
                {url && (
                  <img className="small-image" src={url} alt="Uploaded" />
                )}
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
                  setdescription(e.target.value);
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
                  setprice(e.target.value);
                }}
              />
            </fieldset>
            <fieldset>
                <div>
                <p>category</p>
              <select  value={category} onChange={(e)=>{setcategory(e.target.value)}} >
                <option value="sport">Sport</option>
                <option value="gaming">Gaming</option>
                <option value="phones">Phones</option>
                <option value="pcs">PCs</option>
                <option value="kitchen">Kitchen</option>
                <option value="fishing">Fishing</option>
              </select>
              </div>
            </fieldset>
            <button className="button" type="submit">
              add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
