import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/Context";
import Card from "./Card";
import Navbar from "../Components/Navbar";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { products } = useContext(ProductContext);

  const { search } = useLocation();
  const linkCategory = decodeURIComponent(search.split("=")[1]);
  // console.log(linkCategory);

  const [filteredProduct, setFilteredProduct] = useState([]);

  useEffect(() => {
    if (linkCategory && linkCategory != "undefined") {
      const filtered = products.filter(
        (product) => product.category === linkCategory
      );
      setFilteredProduct(filtered);
    } else {
      setFilteredProduct(products);
    }
  }, [linkCategory, products]);

  return (
    <div className="w-full h-screen relative bg-zinc-200 md:flex ">
      <Navbar />
      <div className=" h-full md:w-[85vw] flex flex-col w-screen">
        <div className="bg-slate-800 text-center pt-2">
          <h1 className="text-white text-xl">
            {linkCategory && linkCategory !== "undefined"
              ? linkCategory.toUpperCase()
              : "ALL"}
          </h1>
        </div>
        <div className="relative h-full w-full bg-slate-800 flex flex-wrap gap-6 py-8 px-6 overflow-x-hidden overflow-y-auto justify-center items-center">
          {filteredProduct.map((item) => {
            return <Card key={item.id} product={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
