import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import apiUrl from "../../apiUrl";

const Shop = () => {
  const [products, setProducts] = useState([]);
  console.log(products);

  const getAllProducts = () => {
    axios
      .get(apiUrl + "/products/all_products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    axios
      .post(apiUrl + "/products/delete", {
        prod_id: id,
      })
      .then((response) => {
        console.log(response.data);
        getAllProducts();
        alert(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <h1>Save Product</h1>

      <div className="products">
        {products.map((product) => (
          <div className="product" key={product._id}>
            <h1>{product.name}</h1>
            <h1>{product.price}</h1>
            <h1>{product.description}</h1>
            <img src={apiUrl + "/" + product.image} alt="" />
            <button
              onClick={() => {
                handleDelete(product._id);
              }}
            >
              Delete
            </button>
            <a
              href={
                "/productdetail/" +
                product._id +
                "/" +
                product.name +
                "/" +
                product.image
              }
            >
              shop
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
