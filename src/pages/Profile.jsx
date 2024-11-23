import React, { useEffect, useState } from "react";
import { useUpdateUserProfileMutation } from "../apis/userApi";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.userReducer);
  if (loading) return <Loader />;

  const [updateUserProfile, { isLoading: ul }] = useUpdateUserProfileMutation();
  const [userPro, setUserPro] = useState({
    name: "",
    avatar: "noImg",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setUserPro({
        name: user.name || "",
        avatar: "noImg",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const result = await updateUserProfile(userPro);
    console.log(result);
    if (result.user.success) {
      toast.success("Profile Updated successfully");
    } else {
      toast.error(result.user.error);
    }
  };

  if (ul) {
    return <Loader />;
  }

  const showProBox = () => {
    const proBox = document.querySelector(".proBox");
    proBox.showModal();
  };
  const closeProBox = (e) => {
    const proBox = document.querySelector(".proBox");
    const proCloseBtn = document.querySelector(".proCloseBtn");
    if (e.target === proBox || e.target === proCloseBtn) {
      proBox.close();
    }
  };

  const proBoxChange = (e) => {
    if (e.target.name === "avatar" && e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUserPro({ ...userPro, avatar: reader.result });
      };
    } else {
      setUserPro({ ...userPro, [e.target.name]: e.target.value });
    }
  };

  return (
    <div>
      <nav className="profileNav">
        <div>
          <Link to={"/"}>
            <img
              src={
                "https://deployfootball.com/cdn/shop/files/5_1080x.png?v=1721956234"
              }
              alt="img"
            />
          </Link>
        </div>
        <div>
          <h2>User Profile</h2>

          <Link to={"/profile"}>
            <img
              src={user.avatar.url ? user.avatar.url : ""} // TODO: add placeholder image
              alt=""
            />
            {/* <FaUser /> */}
          </Link>
        </div>
      </nav>
      <div className="proContainer">
        <div>
          <img
            src={user.avatar.url ? user.avatar.url : ""} // TODO: add a placeholder user image
            alt={user.name}
          />
        </div>
        <div>
          <div>
            <h2>{user.name}</h2>
            <button onClick={showProBox}>
              <FaRegEdit />
            </button>
          </div>
          <dialog className="proBox" onClick={closeProBox}>
            <div>
              <button onClick={closeProBox} className="proCloseBtn">
                X
              </button>
              <div className="proBoxFormCont">
                <h2>Edit Profile</h2>
                <form method="dialog" onSubmit={handleUpdateProfile}>
                  <div className="file-input-container">
                    <img
                      src={
                        userPro.avatar === "noImg"
                          ? user.avatar.url
                          : userPro.avatar
                      }
                      alt={userPro.name}
                    />
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      accept="image/*"
                      onChange={proBoxChange}
                    />
                    <label htmlFor="avatar" className="file-input-label">
                      <FaRegEdit />
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    value={userPro.name}
                    name="name"
                    onChange={proBoxChange}
                  />
                  <input
                    type="text"
                    placeholder="Enter Email"
                    value={userPro.email}
                    name="email"
                    onChange={proBoxChange}
                  />
                  <input type="submit" value="Update Profile" />
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Profile;
