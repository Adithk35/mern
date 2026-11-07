import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [role, setrole] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirm_pass, setconfirm_pass] = useState("");

  const handleClick = () => {
    console.log({
      name,
      email,
      password,
      confirm_pass,
      role,
    });

    axios
      .post("http://localhost:8000/auth/register", {
        name,
        email,
        password,
        confirm_pass,
        role,
      })
      .then((response) => {
        console.log(response);
        alert(response.data);
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Signup</h1>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => {
          setname(e.target.value);
        }}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setemail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setpassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setconfirm_pass(e.target.value)}
      />
      <select onChange={(e) => setrole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={handleClick}>Signup</button>
    </div>
  );
};

export default Signup;
