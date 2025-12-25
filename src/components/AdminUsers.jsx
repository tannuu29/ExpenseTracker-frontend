import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const role = localStorage.getItem("role");

  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token")?.trim();

      if (!token) {
        setError("Missing token. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:80/admin/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")?.trim()}`,
          },
        });

        if (!res.ok) {
          // Try to surface a helpful message if backend returns JSON
          let message = `Request failed (${res.status})`;
          try {
            const data = await res.json();
            if (data?.message) message = data.message;
          } catch {
            // ignore JSON parse errors
          }
          throw new Error(message);
        }

        const data = await res.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e?.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    }

    // Extra safety: page should only ever be reachable via AdminRoute,
    // but this keeps the UI clean if someone renders it directly.
    if (role === "ADMIN") loadUsers();
    else {
      setLoading(false);
      setUsers([]);
      setError("Not authorized.");
    }
  }, [role]);

  return (
    <div style={{ padding: 16 }}>
      <h2>Admin: Users</h2>

      {loading && <p>Loading users…</p>}
      {!loading && error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: 12,
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Username</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Role</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td style={tdStyle} colSpan={5}>
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((u, idx) => (
                  <tr key={u?.id ?? u?._id ?? idx}>
                    <td style={tdStyle}>{u?.id ?? u?._id ?? "-"}</td>
                    <td style={tdStyle}>
                      {u?.username ?? u?.name ?? u?.email ?? "-"}
                    </td>
                    <td style={tdStyle}>{u?.email ?? "-"}</td>
                    <td style={tdStyle}>{u?.role ?? "-"}</td>
                    <td style={tdStyle}>
                      <Link to={`/admin/users/${u?.id ?? u?._id ?? ""}`}>
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: 10,
  borderBottom: "1px solid #ddd",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: 10,
  borderBottom: "1px solid #eee",
  whiteSpace: "nowrap",
};


