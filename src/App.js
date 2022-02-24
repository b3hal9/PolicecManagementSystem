import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./Homepage";
import FeedPage from "./components/feed/FeedPage";
import RecordPage from "./components/record/RecordPage";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ProfilePage from "./components/record/ProfilePage";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import autoLogin from "./utils/autoLogin";
import ReportPage from "./components/report/ReportPage";
import { Outlet } from "react-router-dom";
import io from "socket.io-client";
import { toast, ToastContainer } from "react-toastify";
import { setEmergencyRequest } from "./store/actions/requestAction";
import ResetForm from "./components/auth/ResetForm";
import ResetPage from "./components/auth/ResetPage";
import NoMatch from "./components/layout/common/NoMatch";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const socket = io("http://localhost:5000");
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwtToken");
  //validate token
  autoLogin(dispatch, token);

  function PrivateRoute() {
    return !token ? <Navigate to="/login" /> : <Outlet />;
  }
  function PublicRoute() {
    return token ? <Navigate to="/" /> : <Outlet />;
  }

  useEffect(() => {
    socket.on("connect", async () => {
      socket.on("locationSignal", (data) => {
        //dispatch data
        dispatch(setEmergencyRequest(data));
        toast.warn("Emergency Alert", {
          newestOnTop: true,
          pauseOnHover: true,
        });
      });
      socket.on("reportAlert", (data) => {
        toast.warn(`New Report from ${data.name}`);
      });
    });
  }, [dispatch, socket]);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/add_new_department" element={<RegisterForm />} />
          <Route path="/reset" element={<ResetForm />} />
          <Route path="/resetpage" element={<ResetPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/record" element={<RecordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/inbox" element={<ReportPage />} />
          <Route path="/user/:id" element={<ProfilePage />} />
          <Route path="/setting" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
