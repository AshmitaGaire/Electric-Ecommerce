import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const allProducts = useSelector((state) => state.products.products);
  console.log("total products ", allProducts.length);
  const { id } = useParams();
  const [data, setData] = useState(null);
  

  useEffect(() => {
    const newData = allProducts && allProducts.find((i) => i._id === id);
    console.log(" p detail ", newData);
    setData(newData);
  }, [allProducts, id]);
  

  return (
    <div>
      <Header />
      <ProductDetails data={data} />

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
