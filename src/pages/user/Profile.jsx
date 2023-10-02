import React from "react";
import { useAuth } from "../../context/AuthProvider";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div style={{ fontSize: "24px" }}>
    You are logged in and this is Profile {user.email}
    </div>
  );
};

export default Profile;
