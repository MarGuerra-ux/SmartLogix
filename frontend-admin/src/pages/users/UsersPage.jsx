import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";

import "../../styles/ModulePages.css";
import "../../styles/UsersPage.css";

function generateToken() {
  return `SLX-${crypto.randomUUID()}`;
}

function formatDate(value) {
  if (!value) return "Sin acceso";

  return new Date(value).toLocaleString("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getInitials(name) {
  if (!name) return "US";

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "Administrador",
    status: "Activo",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);

    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error cargando usuarios:", error);
      setUsers([]);
    } else {
      setUsers(data || []);
    }

    setLoading(false);
  }

  async function createUser(event) {
    event.preventDefault();

    const token = generateToken();

    const { error } = await supabase.from("admin_users").insert([
      {
        full_name: form.full_name,
        email: form.email,
        password: form.password,
        role: "Administrador",
        status: "Activo",
        token,
      },
    ]);

    if (error) {
      alert("No se pudo crear el usuario. Revisa si el correo ya existe.");
      console.error(error);
      return;
    }

    setForm({
      full_name: "",
      email: "",
      password: "",
      role: "Administrador",
      status: "Activo",
    });

    setShowRegisterModal(false);
    loadUsers();
  }

  const filteredUsers = useMemo(() => {
    const term = search.toLowerCase();

    return users.filter((user) => {
      return (
        user.full_name?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term) ||
        user.role?.toLowerCase().includes(term) ||
        user.status?.toLowerCase().includes(term)
      );
    });
  }, [users, search]);

  const activeUsers = users.filter((user) => user.status === "Activo");
  const adminUsers = users.filter((user) => user.role === "Administrador");
  const usersWithToken = users.filter((user) => user.token);

  return (
    <section className="module-page">
      <div className="module-page-header">
        <span className="module-page-kicker">ADMINISTRACIÓN</span>

        <h1 className="module-page-title">Usuarios</h1>

        <p className="module-page-description">
          Administración de usuarios internos, roles, permisos y sesiones del
          panel SmartLogix.
        </p>
      </div>

      {loading ? (
        <div className="placeholder-card">
          <div className="placeholder-icon">⏳</div>
          <h2>Cargando usuarios...</h2>
          <p>Obteniendo usuarios administrativos desde Supabase.</p>
        </div>
      ) : (
        <>
          <div className="users-kpi-grid">
            <article className="users-kpi-card positive">
              <span>Usuarios activos</span>
              <strong>{activeUsers.length}</strong>
              <p>Cuentas habilitadas para operar el panel.</p>
            </article>

            <article className="users-kpi-card neutral">
              <span>Administradores</span>
              <strong>{adminUsers.length}</strong>
              <p>Usuarios con permisos completos.</p>
            </article>

            <article className="users-kpi-card warning">
              <span>Sesiones con token</span>
              <strong>{usersWithToken.length}</strong>
              <p>Usuarios con token generado.</p>
            </article>
          </div>

          <div className="users-toolbar">
            <input
              type="text"
              placeholder="Buscar usuario..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <button
              className="users-primary-button"
              onClick={() => setShowRegisterModal(true)}
            >
              + Registrar usuario
            </button>
          </div>

          <article className="users-table-card">
            <div className="users-table-wrapper">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Último acceso</th>
                    <th>Token</th>
                    <th>Acción</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar">
                            {getInitials(user.full_name)}
                          </div>

                          <div>
                            <strong>{user.full_name}</strong>
                            <span>ID interno: {user.id}</span>
                          </div>
                        </div>
                      </td>

                      <td>{user.email}</td>

                      <td>
                        <span className="role-badge">{user.role}</span>
                      </td>

                      <td>
                        <span className="user-status-badge">
                          {user.status}
                        </span>
                      </td>

                      <td>{formatDate(user.last_login)}</td>

                      <td>
                        <span
                          className={
                            user.token ? "token-badge active" : "token-badge"
                          }
                        >
                          {user.token ? "Generado" : "Sin token"}
                        </span>
                      </td>

                      <td>
                        <button
                          className="users-action-button"
                          onClick={() => setSelectedUser(user)}
                        >
                          Ver perfil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </>
      )}

      {selectedUser && (
        <div className="users-modal-overlay">
          <div className="users-modal">
            <button
              className="users-modal-close"
              onClick={() => setSelectedUser(null)}
            >
              ×
            </button>

            <div className="users-modal-layout">
              <aside className="user-profile-card">
                <div className="user-profile-avatar">
                  {getInitials(selectedUser.full_name)}
                </div>

                <h2>{selectedUser.full_name}</h2>
                <p>{selectedUser.email}</p>

                <span className="user-status-badge">
                  {selectedUser.status}
                </span>
              </aside>

              <div className="user-info-card">
                <span className="user-section-tag">PERFIL ADMINISTRATIVO</span>
                <h2>Detalle del usuario</h2>

                <div className="user-info-grid">
                  <div>
                    <span>Nombre</span>
                    <strong>{selectedUser.full_name}</strong>
                  </div>

                  <div>
                    <span>Correo institucional</span>
                    <strong>{selectedUser.email}</strong>
                  </div>

                  <div>
                    <span>Rol</span>
                    <strong className="green-text">{selectedUser.role}</strong>
                  </div>

                  <div>
                    <span>Estado</span>
                    <strong className="green-text">
                      {selectedUser.status}
                    </strong>
                  </div>

                  <div>
                    <span>Último acceso</span>
                    <strong>{formatDate(selectedUser.last_login)}</strong>
                  </div>

                  <div>
                    <span>Token de sesión</span>
                    <strong>
                      {selectedUser.token
                        ? selectedUser.token.slice(0, 22) + "..."
                        : "Sin token generado"}
                    </strong>
                  </div>
                </div>

                <div className="user-permissions-card">
                  <span>PERMISOS ACTIVOS</span>

                  <div className="permission-grid">
                    <div className="permission-item active">Pedidos</div>
                    <div className="permission-item active">Inventario</div>
                    <div className="permission-item active">Envíos</div>
                    <div className="permission-item active">Ventas</div>
                    <div className="permission-item active">Reembolsos</div>
                    <div className="permission-item active">Configuración</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showRegisterModal && (
        <div className="users-modal-overlay">
          <div className="register-modal">
            <div className="register-modal-header">
              <div>
                <span>REGISTRO DE USUARIO</span>
                <h2>Crear cuenta administrativa</h2>
                <p>
                  El nuevo usuario quedará registrado con rol Administrador y
                  acceso completo al panel.
                </p>
              </div>

              <button
                className="users-modal-close"
                onClick={() => setShowRegisterModal(false)}
              >
                ×
              </button>
            </div>

            <form className="register-form" onSubmit={createUser}>
              <div>
                <label>Nombre completo</label>
                <input
                  type="text"
                  required
                  value={form.full_name}
                  onChange={(event) =>
                    setForm({ ...form, full_name: event.target.value })
                  }
                  placeholder="Ej: Marco Guerra"
                />
              </div>

              <div>
                <label>Correo institucional</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                  placeholder="usuario@duocuc.cl"
                />
              </div>

              <div>
                <label>Clave</label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(event) =>
                    setForm({ ...form, password: event.target.value })
                  }
                  placeholder="Clave de acceso"
                />
              </div>

              <div>
                <label>Rol</label>
                <input type="text" value="Administrador" disabled />
              </div>

              <div className="register-actions">
                <button
                  type="button"
                  className="users-secondary-button"
                  onClick={() => setShowRegisterModal(false)}
                >
                  Cancelar
                </button>

                <button type="submit" className="users-primary-button">
                  Crear usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default UsersPage;