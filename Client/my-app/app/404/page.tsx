import "../styles/404.css"
import Image from "next/image"

export default function NotFoundPage () {
  return (
    <div>
      <div className="not-found-container">
        <div className="notfound-breadcrumb">
          Home / <span className="breadcrumb-error">404 Error</span>
        </div>
        <h1>404 Not Found</h1>
        <Image src="https://res.cloudinary.com/dcyeimdps/image/upload/v1717767270/u6cocyiay3ztbgxghppx.png" alt="Sad face" width={100} height={100} className="sad-face" />
        <p>Your visited page not found. You may go home page.</p>
        <button className="back-home-button">Back to home page</button>
      </div>
    </div>
  );
}


