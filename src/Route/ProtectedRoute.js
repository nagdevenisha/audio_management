import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, roles }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);

    // check expiry
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }

    // check role
    if (roles && !roles.includes(decoded.role)) {
      return <Navigate to="/unauthorized" />;
    }

    return children; // ✅ authorized
  } catch (err) {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
