import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";

const ProfileContext = createContext({});

export const useProfiles = () => useContext(ProfileContext);

const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");

  const addProfile = async (profile) => {
    profile.created_at = new Date();
    profile.updated_at = new Date();
    const { data, error } = await supabase
      .from("profiles")
      .insert(profile)
      .select();
    if (data) {
      setProfiles((prevProfiles) => [...prevProfiles, data[0]]);
      setMsg("Profile Added Successfully");
    }
    if (error) {
      console.log(error);
      setErrorMsg(error.message);
    }
  };

  const editProfile = async (profile, id) => {
    const { data, error } = await supabase
      .from("profiles")
      .update(profile)
      .eq("id", id)
      .select();
    if (error) {
      setErrorMsg(error.message);
      console.error(error);
    }
    if (data) {
      setMsg("Profile Updated");
      const updatedProfiles = profiles.map((profile) => {
        if (id === profile.id) {
          return { ...profile, ...data[0] };
        }
        return profile;
      });
      setProfiles(updatedProfiles);
    }
  };

  const deleteProfile = async (id) => {
    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (error) {
      setErrorMsg(error.message);
    } else {
      setMsg("Profile Deleted Successfully");
      setProfiles((prevProfiles) =>
        prevProfiles.filter((profile) => profile.id !== id)
      );
    }
  };

  const fetchAll = async () => {
    const { data, error } = await supabase.from("profiles").select();
    if (data) setProfiles(data);
    if (error) setErrorMsg("Error in Fetching Profiles");
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        addProfile,
        msg,
        setMsg,
        errorMsg,
        setErrorMsg,
        editProfile,
        deleteProfile
      }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;