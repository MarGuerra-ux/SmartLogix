import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";

import "../../styles/ModulePages.css";
import "../../styles/ClientsPage.css";

function getInitials(name) {
  if (!name) return "CL";

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    setLoading(true);

    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error cargando clientes:", error);
      setClients([]);
    } else {
      setClients(data || []);
    }

    setLoading(false);
  }

  const filteredClients = useMemo(() => {
    const term = search.toLowerCase();

    return clients.filter((client) => {
      return (
        client.full_name?.toLowerCase().includes(term) ||
        client.email?.toLowerCase().includes(term) ||
        client.phone?.toLowerCase().includes(term) ||
        client.city?.toLowerCase().includes(term) ||
        client.region?.toLowerCase().includes(term)
      );
    });
  }, [clients, search]);

  return (
    <section className="module-page">
      <div className="module-page-header">
        <span className="module-page-kicker">MÓDULO DE CLIENTES</span>

        <h1 className="module-page-title">Clientes</h1>

        <p className="module-page-description">
          Administra clientes, información de contacto, ubicación y datos
          bancarios asociados a procesos de venta y reembolso.
        </p>
      </div>

      <div className="clients-toolbar">
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {loading ? (
        <div className="placeholder-card">
          <div className="placeholder-icon">⏳</div>
          <h2>Cargando clientes...</h2>
          <p>Obteniendo información desde Supabase.</p>
        </div>
      ) : (
        <article className="clients-table-card">
          <div className="clients-table-wrapper">
            <table className="clients-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Ciudad</th>
                  <th>Teléfono</th>
                  <th>Región</th>
                  <th>Banco</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>

              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id}>
                    <td>
                      <div className="client-cell">
                        <div className="client-avatar">
                          {getInitials(client.full_name)}
                        </div>

                        <div>
                          <strong>{client.full_name}</strong>
                          <span>{client.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>{client.city || "Sin ciudad"}</td>

                    <td>{client.phone || "Sin teléfono"}</td>

                    <td>{client.region || "Sin región"}</td>

                    <td>{client.bank_name || "No registrado"}</td>

                    <td>
                      <span className="client-status-badge">Vigente</span>
                    </td>

                    <td>
                      <button
                        className="client-action-button"
                        onClick={() => setSelectedClient(client)}
                      >
                        Ver ficha
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      )}

      {selectedClient && (
        <div className="client-modal-overlay">
          <div className="client-modal">
            <button
              className="client-modal-close"
              onClick={() => setSelectedClient(null)}
            >
              ×
            </button>

            <div className="client-modal-layout">
              <aside className="client-profile-card">
                <div className="client-profile-avatar">
                  {getInitials(selectedClient.full_name)}
                </div>

                <h2>{selectedClient.full_name}</h2>

                <p>{selectedClient.email || "Sin correo"}</p>

                <span className="client-status-badge">Vigente</span>
              </aside>

              <div className="client-info-card">
                <h2>Perfil del cliente</h2>

                <div className="client-info-grid">
                  <span>Teléfono</span>
                  <strong>{selectedClient.phone || "Sin teléfono"}</strong>

                  <span>Dirección</span>
                  <strong>{selectedClient.address || "Sin dirección"}</strong>

                  <span>Ciudad</span>
                  <strong>{selectedClient.city || "Sin ciudad"}</strong>

                  <span>Región</span>
                  <strong>{selectedClient.region || "Sin región"}</strong>
                </div>

                <div className="client-bank-section">
                  <div className="client-bank-header">
                    <span>DATOS BANCARIOS</span>
                    <h3>Información para reembolsos</h3>
                  </div>

                  <div className="client-bank-grid">
                    <div>
                      <span>Banco</span>
                      <strong>{selectedClient.bank_name || "No registrado"}</strong>
                    </div>

                    <div>
                      <span>Tipo de cuenta</span>
                      <strong>
                        {selectedClient.account_type || "No registrado"}
                      </strong>
                    </div>

                    <div>
                      <span>Número de cuenta</span>
                      <strong>
                        {selectedClient.account_number || "No registrado"}
                      </strong>
                    </div>

                    <div>
                      <span>Titular</span>
                      <strong>
                        {selectedClient.account_holder_name ||
                          selectedClient.full_name ||
                          "No registrado"}
                      </strong>
                    </div>

                    <div>
                      <span>RUT titular</span>
                      <strong>
                        {selectedClient.account_holder_rut || "No registrado"}
                      </strong>
                    </div>

                    <div>
                      <span>Correo reembolso</span>
                      <strong>
                        {selectedClient.refund_email ||
                          selectedClient.email ||
                          "No registrado"}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="client-modal-actions">
                  <button className="client-primary-button">
                    Editar cliente
                  </button>

                  <button className="client-secondary-button">
                    Eliminar cliente
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ClientsPage;