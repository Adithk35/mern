import React from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  console.log(user);

  return (
    <>
      <div>Profile</div>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.role}</div>
    </>
  );
};

export default Profile;
