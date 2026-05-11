import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../styles/MainLayout.css";

function MainLayout() {
  const [openSections, setOpenSections] = useState({
    general: true,
    operaciones: true,
    clientes: false,
    finanzas: false,
    analiticas: false,
    sistema: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const SectionButton = ({ id, title }) => (
    <button
      type="button"
      className="sidebar-section-button"
      onClick={() => toggleSection(id)}
    >
      <span>{title}</span>
      <span className="section-arrow">{openSections[id] ? "▼" : "▶"}</span>
    </button>
  );

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
          <SectionButton id="general" title="General" />

          {openSections.general && (
            <div className="sidebar-group">
              <NavLink to="/dashboard">🏠 Dashboard</NavLink>
              <NavLink to="/activity">🔔 Actividad</NavLink>
            </div>
          )}

          <SectionButton id="operaciones" title="Operaciones" />

          {openSections.operaciones && (
            <div className="sidebar-group">
              <NavLink to="/orders">🧾 Pedidos</NavLink>
              <NavLink to="/shipping">🚚 Envíos</NavLink>
              <NavLink to="/inventory">📦 Inventarios</NavLink>
              <NavLink to="/products">🏷️ Productos</NavLink>
            </div>
          )}

          <SectionButton id="clientes" title="Clientes" />

          {openSections.clientes && (
            <div className="sidebar-group">
              <NavLink to="/clients">👥 Clientes</NavLink>
            </div>
          )}

          <SectionButton id="finanzas" title="Finanzas" />

          {openSections.finanzas && (
            <div className="sidebar-group">
              <NavLink to="/sales">💰 Ventas</NavLink>
              <NavLink to="/daily-cash">🏦 Caja diaria</NavLink>
              <NavLink to="/refunds">💸 Reembolsos</NavLink>
            </div>
          )}

          <SectionButton id="analiticas" title="Analíticas" />

          {openSections.analiticas && (
            <div className="sidebar-group">
              <NavLink to="/metrics">📊 Métricas</NavLink>
              <NavLink to="/top-sales">🏆 Top ventas</NavLink>
            </div>
          )}

          <SectionButton id="sistema" title="Sistema" />

          {openSections.sistema && (
            <div className="sidebar-group">
              <NavLink to="/users">👤 Usuarios</NavLink>
              <NavLink to="/settings">⚙️ Configuración</NavLink>
            </div>
          )}
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