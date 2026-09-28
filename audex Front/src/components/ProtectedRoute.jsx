import { Navigate } from "react-router-dom";
import { hasPermission } from "../auth/permissions";

function ProtectedRoute({ role, page, children }) {
  const allowed = hasPermission(role, page);

  if (!allowed) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;