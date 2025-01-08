import React, { useContext, useState } from "react";
import { ProductContext } from "../context/Context";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const { products, setProducts } = useContext(ProductContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitProduct = (data) => {
    const addProduct = {
      id: nanoid(),
      title: data.title,
      image: data.image,
      model: data.model,
      price: data.price,
      category: data.category,
      description: data.description,
    };
    // console.log(addProduct);
    setProducts([...products, addProduct]);
    // localStorage.setItem("products", JSON.stringify([...products, addProduct]));

    // setProducts((prevProducts) => {
    //   const updatedProducts = [...prevProducts, addProduct];
    //   localStorage.setItem("products", JSON.stringify(updatedProducts));
    //   return updatedProducts;
    // });
    reset();
    toast.success("Successfully add new product");
    navigate("/");
  };

  return (
    <div className="flex justify-center">
      <form className="w-[80%] md:w-1/2" onSubmit={handleSubmit(submitProduct)}>
        <h1 className="text-2xl text-center my-2">Add New Product</h1>

        <div className="mb-4">
          <input
            {...register("title", { required: true })}
            className=" w-full bg-zinc-200 rounded-sm px-2 py-2 text-base font-semibold outline-none"
            type="text"
            placeholder="title"
          />
          {errors.title?.type === "required" && (
            <p className="text-red-500 text-sm" role="alert">
              title is required
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("image", { required: true })}
            className="w-full bg-zinc-200 rounded-sm px-2 py-2 text-base font-semibold outline-none"
            type="text"
            placeholder="image url"
          />
          {errors.image?.type === "required" && (
            <p className="text-red-500 text-sm" role="alert">
              image url is required
            </p>
          )}
        </div>

        <div className="flex justify-between gap-2 mb-4">
          <div className="w-1/2">
            <input
              {...register("model", { required: true })}
              className="w-full bg-zinc-200 rounded-sm px-2 py-2 text-base font-semibold outline-none"
              type="text"
              placeholder="model"
            />
            {errors.model?.type === "required" && (
              <p className="text-red-500 text-sm" role="alert">
                model is required
              </p>
            )}
          </div>

          <div className="w-1/2">
            <input
              {...register("price", { required: true })}
              className="w-full bg-zinc-200 rounded-sm px-2 py-2 text-base font-semibold outline-none"
              type="number"
              placeholder="price"
            />
            {errors.price?.type === "required" && (
              <p className="text-red-500 text-sm" role="alert">
                price is required
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <input
            {...register("category", { required: true })}
            className="w-full bg-zinc-200 rounded-sm px-2 py-2 text-base font-semibold outline-none"
            type="text"
            placeholder="category"
          />
          {errors.category?.type === "required" && (
            <p className="text-red-500 text-sm" role="alert">
              category is required
            </p>
          )}
        </div>

        <div className="mb-2">
          <textarea
            rows={10}
            {...register("description", { required: true })}
            className="w-full bg-zinc-200 rounded-sm px-2 py-2 text-base font-semibold outline-none"
            type="text"
            placeholder="production description here"
          />
          {errors.description?.type === "required" && (
            <p className="text-red-500 text-sm" role="alert">
              description is required
            </p>
          )}
        </div>

        <input
          className="bg-blue-500 rounded-md px-4 py-1 text-white font-semibold h-10 w-full"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default Create;
