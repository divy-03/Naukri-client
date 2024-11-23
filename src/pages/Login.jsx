import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useLoginUserMutation, useRegisterUserMutation } from "../apis/userApi";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userExist } from "../reducers/userReducer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Login = () => {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { isLoading: ll, isError: errLogin }] =
    useLoginUserMutation();
  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await loginUser({ email, password });
    if (errLogin || result.data?.error) {
      toast.error(result.error.data.error);
    } else {
      const successMessages = [
        "🥅Goal! You're back in the game!",
        "🏆Welcome back, champ!",
        "⚽Kick-off! You're in for the match.",
      ];

      const randomMessage =
        successMessages[Math.floor(Math.random() * successMessages.length)];

      dispatch(userExist(result.data.user));
      toast.success(randomMessage);
      navigate("/");
    }
  };

  const dataChange = (e) => {
    if (e.target.name === "avatar" && e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setUser({ ...user, avatar: reader.result });
        }
      };
      reader.readAsDataURL(file);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const [registerUser, { isLoading: rl, isError: errSign }] =
    useRegisterUserMutation();
  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await registerUser(user);
    if (errSign) {
      toast.error(result.error.data.error);
    } else {
      const successMessages = [
        "👋Welcome to the squad!",
        "🏆You're officially on the team!",
        "✍Great signing! The season starts now.",
      ];

      const randomMessage =
        successMessages[Math.floor(Math.random() * successMessages.length)];
      dispatch(userExist(result.data.user));
      toast.success(randomMessage);
      navigate("/");
    }
  };

  useGSAP(() => {
    gsap.to(".logBtn", {
      x: 50,
      duration: 0.5,
      scale: 1.6,
      ease: "back.out(1.7)",
    });
    gsap.to(".regBtn", {
      x: 50,
      duration: 0.5,
      scale: 1,
      ease: "back.out(1.7)",
    });
  });

  const showLoginBox = () => {
    gsap.to(".loginBox", { x: "0%", duration: 0.5, ease: "power2.out" });
    gsap.to(".registerBox", { x: "100%", duration: 0.5, ease: "power2.out" });

    gsap.to(".logBtn", {
      x: 50,
      duration: 0.5,
      scale: 1.6,
      ease: "back.out(1.7)",
    });
    gsap.to(".regBtn", {
      x: 50,
      duration: 0.5,
      scale: 1,
      ease: "back.out(1.7)",
    });
  };

  const showRegisterBox = () => {
    gsap.to(".loginBox", { x: "-100%", duration: 0.5, ease: "power2.out" });
    gsap.to(".registerBox", { x: "0%", duration: 0.5, ease: "power2.out" });

    gsap.to(".regBtn", {
      x: -50,
      duration: 0.5,
      scale: 1.6,
      ease: "back.out(1.7)",
    });
    gsap.to(".logBtn", {
      x: -50,
      duration: 0.5,
      scale: 1,
      ease: "back.out(1.7)",
    });
  };

  if (ll || rl) return <Loader />;

  return (
    <div className="loginCont">
      <div className="contBox">
        <div className="btnBox">
          <button onClick={showLoginBox} className="logBtn">
            Login
          </button>
          <button onClick={showRegisterBox} className="regBtn">
            Register
          </button>
        </div>
        <div className="loginBox">
          {/* <h2>Login</h2> */}
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="registerBox">
          {/* <h2>Register</h2> */}
          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={user.name}
              onChange={dataChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={dataChange}
              autoComplete="email"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={dataChange}
              autoComplete="current-password"
            />
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={dataChange}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
