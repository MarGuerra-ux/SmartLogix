import { useState } from "react";
import SectionHero from "../../components/SectionHero";
import clients from "../../data/clients.json";
import "../../styles/ClientsPage.css";

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="clients-page">
      <SectionHero
        kicker="MÓDULO DE CLIENTES"
        title="Clientes"
        description="Administra clientes, historial comercial y estados de fidelización."
      />

        <div className="clients-toolbar">
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      <div className="clients-list">
        {filteredClients.map((client) => (
          <div className="client-card" key={client.id}>
            <div className="client-avatar">{getInitials(client.name)}</div>

            <div className="client-main-info">
              <strong>{client.name}</strong>
              <span>{client.email}</span>
            </div>

            <div className="client-city">{client.city}</div>

            <div className="client-purchases">
              {client.totalPurchases} compras
            </div>

            <div className="client-total">
              {formatPrice(client.totalSpent)}
            </div>

            <span
              className={`client-status ${client.status
                .toLowerCase()
                .replaceAll(" ", "-")}`}
            >
              {client.status}
            </span>

            <button
              className="client-view-button"
              onClick={() => {
                setSelectedClient(client);
                setActiveSlide(0);
              }}
            >
              Ver ficha
            </button>
          </div>
        ))}
      </div>

      {selectedClient && (
        <div
          className="client-modal-backdrop"
          onClick={() => setSelectedClient(null)}
        >
          <div className="client-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="client-modal-close"
              onClick={() => setSelectedClient(null)}
            >
              ✕
            </button>

            <div className="client-modal-left">
              <div className="client-modal-avatar">
                {getInitials(selectedClient.name)}
              </div>

              <h2>{selectedClient.name}</h2>
              <p>{selectedClient.email}</p>

              <span
                className={`client-status ${selectedClient.status
                  .toLowerCase()
                  .replaceAll(" ", "-")}`}
              >
                {selectedClient.status}
              </span>

              <div className="client-modal-summary">
                <strong>{selectedClient.totalPurchases}</strong>
                <span>Compras realizadas</span>

                <strong>{formatPrice(selectedClient.totalSpent)}</strong>
                <span>Total gastado</span>
              </div>
            </div>

            <div className="client-modal-right">
              <h3>Perfil del cliente</h3>

              <div className="client-detail-grid">
                <span>Teléfono</span>
                <strong>{selectedClient.phone}</strong>

                <span>Ciudad</span>
                <strong>{selectedClient.city}</strong>

                <span>Última compra</span>
                <strong>{selectedClient.lastPurchase}</strong>

                <span>Estado comercial</span>
                <strong>{selectedClient.status}</strong>
              </div>

              <div className="client-modal-actions">
                <button>Contactar</button>
                <button>Crear descuento</button>
                <button>Ver compras</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}