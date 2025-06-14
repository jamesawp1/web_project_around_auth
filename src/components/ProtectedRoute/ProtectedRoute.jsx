import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isLoggedin, children }) {
  if (!isLoggedin) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
