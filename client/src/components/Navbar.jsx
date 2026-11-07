import React from "react";

const Navbar = () => {
  const jwt_token = localStorage.getItem("login_token");
  const role = localStorage.getItem("role");
  const handleLogout = () => {
    setTimeout(() => {
      localStorage.removeItem("login_token");
      localStorage.removeItem("role");

      window.location.href = "/login";
    }, 1000);
  };
  return (
    <div className="navbar">
      <div>Logo</div>

      <div className="web">
        <a href="/" className="nav-home">
          Home
        </a>
        {jwt_token &&
          (role === "admin" ? (
            <a href="/admin">Admin</a>
          ) : (
            <a href="/Shop">Shop</a>
          ))}

        {jwt_token && <a href="/profile">Profile</a>}

        {jwt_token && <a href="/cart">Cart</a>}
      </div>
      {jwt_token ? (
        <div className="navlinks">
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="navlinks">
          <a href="/login" className="nav-home">
            Login
          </a>
          <a href="/register">Register</a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
