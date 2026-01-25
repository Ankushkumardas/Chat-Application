import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SIgnup from "./pages/SIgnup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

const App = () => {
  const { authUser, checkAuth, isCheckauth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckauth && !authUser) {
    return <div>Loading</div>;
  }

  // Protected route wrapper
  const PrivateRoute = ({ children }) => {
    return authUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className="container mx-auto">
      <div className="max-w-full">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/signup"
            element={!authUser ? <SIgnup /> : <Navigate to={"/"} />}
          />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          {/* Catch-all route for non-existent pages */}
          <Route
            path="*"
            element={<Navigate to={authUser ? "/" : "/login"} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
