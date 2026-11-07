import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Productdetail.css";
import axios from "axios";

const Productdetail = () => {
  const { prod_id, prod_name, prod_imgloc, prod_imgname } = useParams();
  const [product, setproduct] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(prod_id, prod_name, prod_imgloc, prod_imgname);

  const getProduct = () => {
    axios
      .get("http://localhost:8000/products/getproduct/" + prod_id)
      .then((res) => {
        console.log(res.data);
        setproduct(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const handleCart = () => {
    console.log(user._id);
    console.log(product._id);

    axios
      .post("http://localhost:8000/cart/addtocart", {
        user_id: user._id,
        product_id: product._id,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="product_detail">
      <div className="image">
        <img
          src={"http://localhost:8000/" + product?.image}
          alt="product image"
        />
      </div>
      <div className="details">
        <div className="prod_name">{product?.name}</div>
        <div>{product?.price}</div>
        <div>{product?.description}</div>
      </div>

      <button onClick={handleCart}>Add to cart </button>
    </div>
  );
};

export default Productdetail;
