import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const allProducts = useSelector((state) => state.products.products);
  const isLoading = useSelector((state) => state.products.isLoading);

  useEffect(() => {
    // Check if allProducts is not null, undefined, empty, and not loading
    if (allProducts && allProducts.length > 0 && !isLoading) {
      setData(allProducts);
    }
  }, [allProducts, isLoading]);
  

    

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={2} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BestSellingPage;
