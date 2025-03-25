import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import * as constants from "../constants";

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
         <img src={`${constants.SERVER_MEDIA}/images/svg/waiting.svg`} alt="" />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

