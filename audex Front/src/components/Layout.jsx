import { Link, Outlet } from "react-router-dom";

function Layout({ user, activeContext, onRoleChange }) {
  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Audex</h1>
          <p className="subtitle">Role-aware application shell</p>
        </div>

        <div className="user-info">
          <span>{user.name}</span>

          <select
            value={user.role}
            onChange={(e) => onRoleChange(e.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </select>
        </div>
      </header>

      <nav className="nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
        <Link to="/reports">Reports</Link>
      </nav>

      <main className="main">
        <section className="context-card">
          <h2>Active Context</h2>

          <p>
            <strong>Product:</strong> {activeContext.product}
          </p>

          <p>
            <strong>Workspace:</strong> {activeContext.workspace}
          </p>

          <p>
            <strong>School:</strong> {activeContext.school}
          </p>

          <p>
            <strong>Current Role:</strong> {user.role}
          </p>
        </section>

        <section className="page-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default Layout;