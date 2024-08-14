import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { getAllProducts } from "../../../redux/actions/product";

const BestDeals = () => {
  // const dispatch = useDispatch(); // Using useDispatch hook to get the dispatch function

  // useEffect(() => {
  //   // Dispatching the getAllProducts action creator
  //   console.log(1);
  //   dispatch(getAllProducts());
  //   console.log(3);
  // }, []); // Adding dispatch to the dependency array
  // edited removed dispatch as dependency array
  const [data, setData] = useState([]);

  const allProducts = useSelector((state) => state.products.products);

  console.log("all products", allProducts);
  useEffect(() => {
    // Checking if allProducts is defined before slicing
    if (allProducts && allProducts.length > 0) {
      const firstFive = allProducts.slice(0, 5);
      // Update state with the sliced data
      setData(firstFive);
    }
  }, [allProducts]); // Adding allProducts to the dependency array

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {/* Map over data only if it's defined and not empty */}
          {data &&
            data.map((item, index) => <ProductCard data={item} key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
