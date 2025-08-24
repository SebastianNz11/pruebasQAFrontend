import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const url = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }
    try {
      const response = await axios.get(`${url}/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const { data } = response;
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    getProducts();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addProduct = async (product) => {
    try {
      const response = await axios.post(`${url}/products`, product, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Product added:", response.data);
      getProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const productDelete = async (id) => {
    try {
      const response = await axios.delete(`${url}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Product deleted:", response.data);
      getProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{ products, addProduct, productDelete, getProducts }}
    >
      {children}
    </TaskContext.Provider>
  );
};
