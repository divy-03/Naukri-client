import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="homeContainer">
      <Link to={"/login"}>Login</Link>
      <Link to={"/profile"}>Profile</Link>
    </div>
  );
};

export default Home;
