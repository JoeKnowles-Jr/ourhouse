import React from "react";
import { useAuth } from "../../context/AuthProvider";
import ProfileForm from "../../components/user/ProfileForm"

const Profile = () => {
  const { user } = useAuth();

  return (
    <div style={{ fontSize: "24px", width: "100%", overFlow: "hidden" }}>
      <div>
        <ProfileForm />
      </div>
    </div>
  );
};

export default Profile;
