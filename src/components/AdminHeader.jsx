import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/admin/login");
  };

  return (
    <header style={{ padding: 16, borderBottom: "1px solid #eee" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <Link to="/admin/users" style={{ textDecoration: "none", fontWeight: 700 }}>
          MoneyMap Admin
        </Link>

        <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <NavLink to="/admin/users">Users</NavLink>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}


