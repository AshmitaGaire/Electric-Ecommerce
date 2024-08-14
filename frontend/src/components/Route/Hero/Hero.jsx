import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-cover bg-center flex items-end`}
      style={{
        backgroundImage:
          "url(https://b1898959.smushcdn.com/1898959/wp-content/uploads/2022/09/AdobeStock_364410753.jpeg?lossy=1&strip=1&webp=1)",
      }}
    >
      <div className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-center py-10`}>
        <h1
          className={`text-4xl md:text-6xl text-white font-semibold mb-4`}
        >
          Best Collection for Electronics
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Discover our latest products and find the perfect electronics for you.
        </p>
        <div className="flex justify-center">
          <Link to="/products">
            <button className={`${styles.button} px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-md font-semibold transition duration-300 ease-in-out`}>
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
