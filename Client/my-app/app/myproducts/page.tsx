'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Modal from "../components/confirmation/page";
import '../styles/myproducts.css';
import '../styles/modal.css';

export default function AllProducts() {
  const { seller } = useAuth();
  const [sellerProducts, setSellerProducts] = useState<any[]>([]);
  const [view, setView] = useState<string>("allproducts");
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [file, setFile] = useState<File | any>(null);
  const [url, setUrl] = useState<string>("");
  const [id, setId] = useState<Number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<() => void>(() => {});
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");

  const router = useRouter();

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

  const del = async (id: any) => {
    try {
      await axios.delete(`http://localhost:4000/api/products/${id}`);
      dataseller();
    } catch (err) {
      console.log(err);
    }
  };

  const update = async (id: any) => {
    try {
      await axios.put(`http://localhost:4000/api/products/${id}`, {
        name: name,
        category: category,
        description: description,
        price: price,
        SellerId: seller.id,
        imgUrl: url,
      });
      dataseller();
      setView("allproducts");
    } catch (err) {
      console.log(err);
    }
  };

  const dataseller = () => {
    axios
      .get(`http://localhost:4000/api/seller/prod/${seller.id}`)
      .then((res) => {
        console.log(res.data);
        setSellerProducts(res.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    dataseller();
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

  const changeView = () => {
    if (view === "allproducts") {
      return (
        <div className="product-list">
          {sellerProducts.map((product: any) => (
            <li key={product.id} className="product-item">
              <h2 className="product-name">{product.name}</h2>
              <img
                src={product.imgUrl}
                alt="product"
                className="product-image"
              />
              <button onClick={() => confirmAction(() => del(product.id), "Confirm Delete", `Are you sure you want to delete ${product.name}?`)}>Delete</button>
              <button onClick={() => { setView("update"); setId(product.id); setName(product.name); setCategory(product.category); setDescription(product.description); setPrice(product.price); setUrl(product.imgUrl); }}>
                Update
              </button>
            </li>
          ))}
        </div>
      );
    } else if (view === "update") {
      return (
        <>
          <fieldset className="updateproduct-fieldset">
            <label className="updateproduct-label">Product Name:</label>
            <input
              className="updateproduct-input"
              type="text"
              name="productname"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </fieldset>
          <fieldset className="updateproduct-fieldset">
            <label className="updateproduct-label">Description:</label>
            <textarea
              className="updateproduct-textarea"
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </fieldset>
          <fieldset className="updateproduct-fieldset">
            <label className="updateproduct-label">Price:</label>
            <input
              className="updateproduct-input"
              type="number"
              step="0.01"
              name="price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </fieldset>
          <fieldset className="updateproduct-fieldset">
            <label className="updateproduct-label">Category:</label>
            <select
              className="updateproduct-input updateproduct-select"
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
          <label className="updateproduct-label updateproduct-upload-label">
            Product Image:
          </label>
          <div className="updateproduct-image-preview">
            {url && (
              <Image
                className="updateproduct-uploaded-image"
                src={url}
                alt="Uploaded"
                width={250}
                height={250}
              />
            )}
          </div>
          <button
            className="updateproduct-button updateproduct-upload-button"
            type="button"
            onClick={() => {
              document.getElementById("fileInput")?.click();
            }}
          >
            Select
          </button>
          <input
            id="fileInput"
            className="updateproduct-file-input"
            type="file"
            onChange={(e: any) => {
              setFile(e.target.files[0]);
            }}
          />
          <button
            className="updateproduct-button updateproduct-upload-button"
            onClick={() => {
              uploadImage();
            }}
          >
            Upload
          </button>
          <button
            className="updateproduct-button"
            onClick={() => confirmAction(() => update(id), "Confirm Update", `Are you sure you want to update ${name}?`)}
          >
            Update
          </button>
        </>
      );
    }
  };

  return (
    <>
      <header>
        <button onClick={() => { router.push("/"); }}>Home</button>
        <button onClick={() => { view === "update" ? setView("allproducts") : router.push("/addproduct"); }}>
          {view === "update" ? "My Products" : "Add Products"}
        </button>
      </header>
      <h1 className="title">My Products</h1>
      {changeView()}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        title={modalTitle}
        message={modalMessage}
      />
    </>
  );
}
