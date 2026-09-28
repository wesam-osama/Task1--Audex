import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import Unauthorized from "./pages/Unauthorized";

function App() {
  const [user, setUser] = useState({
    name: "Rowan",
    role: "Admin",
  });

  const activeContext = {
    product: "Audex",
    workspace: "Demo Workspace",
    school: "Demo School",
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            user={user}
            activeContext={activeContext}
            onRoleChange={(role) => setUser({ ...user, role })}
          />
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />

        <Route
          path="dashboard"
          element={
            <ProtectedRoute role={user.role} page="dashboard">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="users"
          element={
            <ProtectedRoute role={user.role} page="users">
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="reports"
          element={
            <ProtectedRoute role={user.role} page="reports">
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>
    </Routes>
  );
}

export default App;