import React from "react";
import { useAuth } from "../../context/AuthProvider";
import { useProfiles } from "../../context/ProfileProvider";
import ProfileForm from "../../components/user/ProfileForm"

const Profile = () => {
  const { user } = useAuth();
  const { 
    profiles, 
    addProfile, 
    editProfile,
    deleteProfile,
    msg, setMsg
  } = useProfiles()

  console.log("profiles", profiles)

  return (
    <div style={{ fontSize: "24px", width: "100%", overFlow: "hidden" }}>
      <div>
        <ProfileForm />
      </div>
    </div>
  );
};

export default Profile;
