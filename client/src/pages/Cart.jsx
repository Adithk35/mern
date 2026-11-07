import axios from "axios";
import { useEffect, useState } from "react";
import "./Cart.css";

const Cart = () => {
  const [cart, setcart] = useState(null);
  const getcart = () => {
    axios
      .get("http://localhost:8000/cart/getcart")
      .then((res) => {
        setcart(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const user = JSON.parse(localStorage.getItem("user"));

  console.log(user);

  console.log(cart);
  const handleDelete = (cart_id) => {
    axios
      .post("http://localhost:8000/cart/deletecart", {
        cart_id,
      })
      .then((res) => {
        console.log(res.data);
        getcart();
      })
      .catch((er) => {
        console.log(er);
      });
  }; 

  useEffect(() => {
    getcart();
  }, []);

  console.log(cart?.map((item) => item.product_id));

  return (
    <div className="cart">
      <h1>Cart items</h1>
      <div className="cart_test">test cart</div>
      {cart &&
        cart
          .filter((item) => item.user_id._id == user._id)

          .map((item) => (
            <div className="cart-item" key={item._id}>
              <img
                src={"http://localhost:8000/" + item.product_id.image}
                alt=""
              />
              <h1>{item.product_id.name}</h1>
              <button onClick={
                ()=>{
                   handleDelete(item._id);

                }
                
                 }>X</button>
            </div>
          ))}
    </div>
  );
};

export default Cart;
