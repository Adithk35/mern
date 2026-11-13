import { useState } from "react";
import axios from "axios";
import apiUrl from "../apiUrl";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const jwt_token = localStorage.getItem("login_token");
  console.log(jwt_token);

  const handleClick = () => {
    axios
      .post(apiUrl + "/auth/login", {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);

        if (response.data.token) {
          localStorage.setItem("login_token", response.data.token);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("user", JSON.stringify(response.data.name));
          if (response.data.role === "admin") {
            window.location.href = "/admin";
          } else {
            window.location.href = "/Shop";
          }
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick}>Signin</button>
    </div>
  );
};
export default Login;
