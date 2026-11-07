import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [product_name, setProductname] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [gallery, setgallery] = useState([]);
  const [products, setProducts] = useState([]);
  console.log(products);

  console.log(gallery);

  const handleClick = () => {
    const formdata = new FormData();
    formdata.append("product_name", product_name);
    formdata.append("price", price);
    formdata.append("description", description);
    if (image) {
      formdata.append("image", image);
    }

    for (let i = 0; i < gallery.length; i++) {
      formdata.append("gallery", gallery[i]);
    }
    axios
      .post("http://localhost:8000/products/add_product", formdata)
      .then((response) => {
        console.log(response);
        alert(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllProducts = () => {
    axios
      .get("http://localhost:8000/products/all_products")
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
      .post("http://localhost:8000/products/delete", {
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
      <h1>Admin Panel</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setProductname(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          placeholder="Image URL"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <input
          type="file"
          multiple
          placeholder="gallery images"
          onChange={(e) => setgallery(e.target.files)}
        />

        <button onClick={handleClick}>Save Product</button>
      </div>

      <div className="products">
        {products.map((product) => (
          <div className="product" key={product._id}>
            <h1>{product.name}</h1>
            <h1>{product.price}</h1>
            <h1>{product.description}</h1>
            <img src={"http://localhost:8000/" + product.image} alt="" />
            {product.gallery.map((image) => (
              <img src={"http://localhost:8000/" + image} alt="" />
            ))}
            <button
              onClick={() => {
                handleDelete(product._id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
