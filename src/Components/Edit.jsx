import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context/Context";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, setProducts } = useContext(ProductContext);

  // Function to check if a string is numeric
  const isNumeric = (str) => /^[0-9]+$/.test(str);

  const isIdNumeric = isNumeric(id);

  // Find the product to edit
  const productToEdit = products.find((product) => {
    if (isIdNumeric) {
      return Number(product.id) === Number(id);
    } else {
      return String(product.id) === String(id);
    }
  });
  //   console.log(productToEdit);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // console.log("Product found:", productToEdit);
    if (productToEdit) {
      reset({
        title: productToEdit.title,
        image: productToEdit.image,
        model: productToEdit.model,
        price: productToEdit.price,
        category: productToEdit.category,
        description: productToEdit.description,
      });
    }
  }, [productToEdit, reset]);

  const submitProduct = (data) => {
    const updatedProducts = products.map((product) =>
      //   product.id === id ? { ...product, ...data } : product
      {
        if (isIdNumeric) {
          return Number(product.id) === Number(id)
            ? { ...product, ...data }
            : product;
        } else {
          return String(product.id) === String(id)
            ? { ...product, ...data }
            : product;
        }
      }
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    toast.success("Successfully edited product");
    navigate(-1);
  };

  return (
    <div className="flex justify-center">
      <form className="w-[80%] md:w-1/2" onSubmit={handleSubmit(submitProduct)}>
        <h1 className="text-2xl text-center my-2">Edit Product</h1>

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
          value="Edit"
        />
      </form>
    </div>
  );
};

export default Edit;
