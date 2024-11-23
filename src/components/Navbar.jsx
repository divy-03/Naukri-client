import React from "react";
import { useLogoutUserMutation } from "../apis/userApi";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userNotExist } from "../reducers/userReducer";

const Navbar = () => {
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const dispatch = useDispatch();
  if (isLoading) return <Loader />;
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // `unwrap()` returns the actual data or throws an error if the request fails.
      const result = await logoutUser().unwrap();
      console.log(result);
      const successMessages = [
        `⚽Full-time! You've logged out.`,
        "🏟️You're off, see you next match!",
        "🔄Subbed out! Come back soon, champ.",
        "🏁Match over! You're logged out.",
      ];

      const randomSuccessMessage =
        successMessages[Math.floor(Math.random() * successMessages.length)];
      dispatch(userNotExist());
      toast.success(randomSuccessMessage);
    } catch (err) {
      toast.error(err.data.error);
    }
  };
  return (
    <nav className="navbar">
      <div>
        <Link to={"/"}>
          <h2>Naukri</h2>
        </Link>
      </div>
      <div>
        <Link to={"/profile"}>
          {/* <img src={data.user.avatar.url} alt="" /> */}
          {/* <FaUser /> */}
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
