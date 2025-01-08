import React, { useContext } from "react";
import { ProductContext } from "../context/Context";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const { products } = useContext(ProductContext);

  const categories = [...new Set(products.map((product) => product.category))];

  const bulletColor = () => {
    return `rgba(${(Math.random() * 255).toFixed()},${(
      Math.random() * 255
    ).toFixed()},${(Math.random() * 255).toFixed()},0.4)`;
  };

  return (
    <div className="md:w-[15vw] md:h-screen h-max-[10vh] py-8 w-screen items-center bg-zinc-400 pt-5 flex md:flex-col md:items-center relative md:text-center">
      <nav className="relative flex md:flex-col">
        <Link
          to={`/create`}
          className="border rounded-md self-center text-lg py-2 px-5 border-blue-200 text-white md:block"
        >
          Add New Product
        </Link>

        <hr className="md:mt-5 md:mb-3 md:w-full " />
        <h1 className="text-2xl mb-3 ml-4 self-center">Category Filter</h1>

        <div className="grid sm:grid-cols-2 sm:grid-rows-1 gap-0 ml-4 md:flex md:flex-col">
          {categories.map((data, index) => {
            return (
              <NavLink
                to={`/?category=${data}`}
                key={index}
                // style={(e) => {
                //   console.log(e.isActive);
                //   return { color: e.isActive ? "red" : "" };
                // }}
                className="flex items-center mb-3 relative "
              >
                <span
                  style={{ backgroundColor: bulletColor() }}
                  className="h-[15px] w-[15px] rounded-full mr-2 "
                ></span>

                <span className="text-sm font-semibold text-zinc-200 ">
                  {data.toUpperCase()}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
