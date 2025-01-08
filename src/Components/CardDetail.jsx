import React, { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../context/Context";
import Loading from "./Loading";
import { toast } from "react-toastify";

const CardDetail = () => {
  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();

  const { products, setProducts } = useContext(ProductContext);

  // const product = products.find((product) => String(product.id) === String(id));
  // console.log(product);

  const isNumeric = (str) => /^[0-9]+$/.test(str);

  const isIdNumeric = isNumeric(id);

  const product = products.find((product) => {
    if (isIdNumeric) {
      return Number(product.id) === Number(id);
    } else {
      return String(product.id) === String(id);
    }
  });

  const deleteProduct = (id) => {
    const filteredProducts = products.filter((product) => product.id != id);
    setProducts(filteredProducts);
    localStorage.setItem("products", JSON.stringify(filteredProducts));
    toast.success("Product successfully deleted!");
    navigate("/");
  };

  if (!product) {
    return <Loading />;
  }

  return (
    <div className="h-screen w-full grid place-items-center relative">
      <div className=" md:h-[90] md:w-[90%] relative md:flex md:items-center">
        <div className="relative h-full w-[60%] md:w-[40%] md:mx-10 mx-auto overflow-hidden rounded-lg">
          <img
            className="w-full h-full object-contain "
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className="relative h-full w-[80%] mx-auto md:w-[50%] flex flex-col justify-center items-center">
          <div className="relative">
            <h1 className="text-3xl font-semibold ">{product.title}</h1>
            <h3 className="text-sm text-zinc-400 my-2">{product.model}</h3>
            <h2 className="text-red-300">${product.price}</h2>
            <p className="my-2">{product.description}</p>
            <Link
              to={`/edit/${id}`}
              className="mr-3 py-2 px-5 border rounded border-blue-200 text-blue-300"
            >
              Edit
            </Link>
            <button
              onClick={() => deleteProduct(product.id)}
              className="py-2 px-5 border rounded border-red-200 text-red-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
