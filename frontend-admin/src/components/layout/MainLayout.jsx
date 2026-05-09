import { NavLink, Outlet } from "react-router-dom";
import "../../styles/MainLayout.css";

function MainLayout() {
  return (
    <div className="main-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-icon">SL</span>
          <div>
            <h2>SmartLogix</h2>
            <p>Admin Panel</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard">🏠 Dashboard</NavLink>
          <NavLink to="/inventory">📦 Inventarios</NavLink>
          <NavLink to="/orders">🧾 Pedidos</NavLink>
          <NavLink to="/shipping">🚚 Envíos</NavLink>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Panel Administrativo</h1>
            <p>Gestión logística para eCommerce</p>
          </div>

          <div className="user-box">
            <span>👤</span>
            <div>
              <strong>Marco</strong>
              <p>Administrador</p>
            </div>
          </div>
        </header>

        <section className="page-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default MainLayout;