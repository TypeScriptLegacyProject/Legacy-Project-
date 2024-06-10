'use client'

import axios from "axios";
import { useEffect, useState } from "react"
import { useAuth } from "../auth"
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function allproducts(){
    const { seller } = useAuth();
 const [sellerProducts, setSellerProducts] = useState<any>([]);
 const [view,setview]=useState<string>("allproducts")
 const [name, setName] = useState<string>(seller.name);
 const [category, setCategory] = useState<string>(seller.category);
 const [description, setDescription] = useState<string>(seller.description);
 const [price, setPrice] = useState<string>(seller.price);
 const [file, setFile] = useState<File | any>(null);
 const [url, setUrl] = useState<string>(seller.imgUrl);
 const [id,setid]=useState<Number>(0)

 const router=useRouter()
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
 }


 
const del = async(id:any)=>{
  try{
    await axios.delete(`http://localhost:4000/api/products/${id}`)
    dataseller()
  }  
   catch (err) {
    console.log(err);
  }
}

const update=async(id:any)=>{
    try{
        await axios.put(`http://localhost:4000/api/products/${id}`,{
            name: name,
            category: category,
            description: description,
            price: price, 
            SellerId:seller.id,
            imgUrl: url,
        })
        dataseller()
        router.push("/myproducts")
        console.log("hhh");
        
      }  
       catch (err) {
        console.log(err);
      }  
}




const dataseller=()=>{
    axios
    .get(`http://localhost:4000/api/seller/prod/${seller.id}`)
    .then((res) => {
      console.log(res.data);
    setSellerProducts(res.data)
    console.log("kjefzkj",sellerProducts)
    console.log(seller.id);
    

    })
    .catch((error) => console.error(error)); 
}

useEffect(() => {
   dataseller()
  }, [])

  const changeview=()=>{
    if(view==="allproducts"){
        return(
        <>
       
   
    <div>
    {sellerProducts.map((product:any) => {return(
                <li key={product.id} className="product-item">
                  <h2 className="product-name">{product.name}</h2>
                  <img src={product.imgUrl}
                    alt="product"
                    className="product-image"
                  />
                  <button onClick={()=>{del(product.id)}} >delete</button>
                  <button onClick={()=>{setview("update"),setid(product.id)}}>Update</button>
                </li>
                
              )})}
               
    </div>
        </>
        )
    }
    else if(view==="update"){
        return(
            <>
            <fieldset className="updateproduct-fieldset">
            <label className="updateproduct-label">Product Name:</label>
            <input
              className="updateproduct-input"
              type="text"
              name="productname"
             
              value={seller.name}
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
              
              value={seller.description}
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
             
              value={seller.price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </fieldset>
          <fieldset className="updateproduct-fieldset">
            <label className="updateproduct-label">Category:</label>
            <select
              className="updateproduct-input updateproduct-select"
              value={seller.category}
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
          <button onClick={()=>{update(id),router.push("myproducts")}}>update</button>
        
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
          
          </>
        )
    }
  }

  return(
    <>
       <button onClick={()=>{router.push("/")}}>home</button>
       <button onClick={()=>{router.push("/addproduct")}}>add products</button>
  {changeview()}
   
    </>
  )

}