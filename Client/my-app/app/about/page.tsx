"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import "../styles/about.css";
export default function About() {
  const [file, setPhoto] = useState<File | null>(null);
  const [file2, setPhoto2] = useState<File | null>(null);
  const [file3, setPhoto3] = useState<File | null>(null);
  const [file4, setPhoto4] = useState<File | null>(null);
  const [image, setImage] = useState<string>("");
  const [image2, setImage2] = useState<string>("");
  const [image3, setImage3] = useState<string>("");
  const [image4, setImage4] = useState<string>("");

  const uploadPhoto = (
    file: File | null,
    setImage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "exclusive");

    axios
      .post(`https://api.cloudinary.com/v1_1/dcyeimdps/upload`, formData)
      .then((response) => {
        console.log(response.data.secure_url);
        setImage(response.data.secure_url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="our-story-container">
        <div className="breadcrumb">
          <a href="/">Home</a> / <span>About</span>
        </div>
        <div className="our-story-content">
          <div className="text-section">
            <h2>Our Story</h2>
            <p>
              Exclusive has more than 1 million products to offer, growing at a
              very fast pace. Exclusive offers a diverse assortment in
              categories ranging from consumer.
            </p>
          </div>
          <div className="image-section">
            <Image
              src="https://res.cloudinary.com/dcyeimdps/image/upload/v1717768228/vaa1c3nfmjqdjstdjhal.webp"
              alt="Our Story"
              width={600}
              height={400}
            />
          </div>
        </div>
        <div className="stats-section">
          <div className="stat">
            <p>10.5k</p>
            <span>Sellers active our site</span>
          </div>
          <div className="stat highlight">
            <p>33k</p>
            <span>Monthly Product Sale</span>
          </div>
          <div className="stat">
            <p>45.5k</p>
            <span>Customer active in our site</span>
          </div>
          <div className="stat">
            <p>25k</p>
            <span>Annual gross sale in our site</span>
          </div>
        </div>
        <div className="team-section">
          <div className="team-member">
            {image && (
              <Image src={image} alt="Team Member 1" width={100} height={100} />
            )}
            <p className="name">Ahmed Gafsi</p>
            <p className="position">Founder & Chairman</p>
            <div className="social-icons">
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-linkedin"></i>
              <input
                type="file"
                onChange={(e) =>
                  setPhoto(e.target.files ? e.target.files[0] : null)
                }
              />
              <button onClick={() => uploadPhoto(file, setImage)}>
                Upload
              </button>
            </div>
          </div>
          <div className="team-member">
            {image2 && (
              <Image
                src={image2}
                alt="Team Member 2"
                width={100}
                height={100}
              />
            )}
            <p className="name">Selim Ben Said</p>
            <p className="position">Managing Director</p>
            <div className="social-icons">
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-linkedin"></i>
              <input
                type="file"
                onChange={(e) =>
                  setPhoto2(e.target.files ? e.target.files[0] : null)
                }
              />
              <button onClick={() => uploadPhoto(file2, setImage2)}>
                Upload
              </button>
            </div>
          </div>
          <div className="team-member">
            {image3 && (
              <Image
                src={image3}
                alt="Team Member 3"
                width={100}
                height={100}
              />
            )}
            <p className="name">Mohamed Atoui</p>
            <p className="position">Managing</p>
            <div className="social-icons">
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-linkedin"></i>
              <input
                type="file"
                onChange={(e) =>
                  setPhoto3(e.target.files ? e.target.files[0] : null)
                }
              />
              <button onClick={() => uploadPhoto(file3, setImage3)}>
                Upload
              </button>
            </div>
          </div>
          <div className="team-member">
            {image4 && (
              <Image
                src={image4}
                alt="Team Member 4"
                width={100}
                height={100}
              />
            )}
            <p className="name">Ilyes Mehri</p>
            <p className="position">Marketing Specialist</p>
            <div className="social-icons">
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-linkedin"></i>
              <input
                type="file"
                onChange={(e) =>
                  setPhoto4(e.target.files ? e.target.files[0] : null)
                }
              />
              <button onClick={() => uploadPhoto(file4, setImage4)}>
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
