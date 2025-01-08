import Loading from "../Components/Loading";
import axios from "../utils/axios";
import React, { createContext, useEffect, useMemo, useState } from "react";

export const ProductContext = createContext();

const Context = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    // console.log(localStorage.getItem("products"));
    if (storedProducts) {
      setProducts(storedProducts);
      setLoading(false);
    } else {
      getProducts();
    }
  }, []);

  const getProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/products");
      setProducts(response.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log("Products loaded from localStorage:", products);
    // getProducts();
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  const value = useMemo(
    () => ({ products, setProducts }),
    [products, setProducts]
  );

  return (
    <ProductContext.Provider value={value}>
      {loading && !error ? (
        <Loading />
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={getProducts} className="retry-button">
            Retry
          </button>
        </div>
      ) : (
        props.children
      )}
    </ProductContext.Provider>
  );
};

export default Context;
