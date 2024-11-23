import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/app.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserProfileQuery } from "./apis/userApi";
import { userExist, userNotExist } from "./reducers/userReducer";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));

const App = () => {
  const { user, loading } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  // Call the query hook.
  const { data, isLoading, error } = useGetUserProfileQuery();

  useEffect(() => {
    if (data) {
      dispatch(userExist(data.user));
    } else if (error) {
      dispatch(userNotExist());
    }
  }, [data, error, dispatch]);

  if (loading || isLoading) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      <div className="App">
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Logged in Routes */}
            <Route
              element={<ProtectedRoute isAuthenticated={user ? true : false} />}
            >
              <Route path="/profile" element={<Profile />} />
            </Route>

          </Routes>
        </div>
      </div>

      <div className="toastContainer">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </Suspense>
  );
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppRouter;
