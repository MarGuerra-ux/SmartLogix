import { useEffect, useState } from "react";

import SystemModal from "../../components/ui/SystemModal";

import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
  getOrdersByClientId,
} from "../../services/clientService";

import "../../styles/ClientsPage.css";
import "../../styles/ModulePages.css";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedClient, setSelectedClient] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingClientId, setEditingClientId] = useState(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("warning");
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [clientToDelete, setClientToDelete] = useState(null);

  async function loadClients() {
    const data = await getClients();
    setClients(data);
  }

  useEffect(() => {
    loadClients();
  }, []);

  const filteredClients = clients.filter((client) =>
    client.full_name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  function clearForm() {
    setFullName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setCity("");
    setRegion("");
    setEditingClientId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const clientData = {
      full_name: fullName,
      email,
      phone,
      address,
      city,
      region,
    };

    if (editingClientId) {
      await updateClient(editingClientId, clientData);
    } else {
      await createClient(clientData);
    }

    clearForm();
    setShowForm(false);

    loadClients();
  }

  function handleEditClient(client) {
    setEditingClientId(client.id);

    setFullName(client.full_name);
    setEmail(client.email || "");
    setPhone(client.phone || "");
    setAddress(client.address || "");
    setCity(client.city || "");
    setRegion(client.region || "");

    setShowForm(true);
    setSelectedClient(null);
  }

  async function handleDeleteClient(client) {
    const orders = await getOrdersByClientId(client.id);

    if (orders.length > 0) {
      setModalType("warning");

      setModalTitle("Operación bloqueada");

      setModalMessage(
        "Este cliente tiene pedidos asociados. No es posible eliminarlo mientras mantenga información comercial registrada."
      );

      setModalOpen(true);

      return;
    }

    setClientToDelete(client);

    setModalType("error");

    setModalTitle("Eliminar cliente");

    setModalMessage(
      "¿Deseas eliminar este cliente?"
    );

    setModalOpen(true);
  }

  async function confirmDeleteClient() {
    if (!clientToDelete) return;

    await deleteClient(clientToDelete.id);

    setModalOpen(false);

    setClientToDelete(null);

    setSelectedClient(null);

    loadClients();
  }

  function closeModal() {
    setModalOpen(false);

    setClientToDelete(null);
  }

  return (
    <div className="clients-page">
      <div className="module-page-header">
        <span className="module-page-kicker">
          MÓDULO DE CLIENTES
        </span>

        <h1 className="module-page-title">
          Clientes
        </h1>

        <p className="module-page-description">
          Administra clientes, historial comercial y estados de fidelización.
        </p>
      </div>

      <div className="clients-toolbar">
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <button
          onClick={() =>
            setShowForm(!showForm)
          }
        >
          + Nuevo Cliente
        </button>
      </div>

      {showForm && (
        <form
          className="client-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Nombre completo"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            required
          />

          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Teléfono"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Dirección"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Ciudad"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Región"
            value={region}
            onChange={(e) =>
              setRegion(e.target.value)
            }
          />

          <button type="submit">
            {editingClientId
              ? "Actualizar cliente"
              : "Crear cliente"}
          </button>
        </form>
      )}

      <div className="clients-list">
        {filteredClients.map((client) => (
          <div
            className="client-card"
            key={client.id}
          >
            <div className="client-avatar">
              {getInitials(client.full_name)}
            </div>

            <div className="client-main-info">
              <strong>
                {client.full_name}
              </strong>

              <span>
                {client.email ||
                  "Sin correo registrado"}
              </span>
            </div>

            <div className="client-city">
              {client.city || "Sin ciudad"}
            </div>

            <div className="client-purchases">
              {client.phone ||
                "Sin teléfono"}
            </div>

            <div className="client-total">
              {client.region ||
                "Sin región"}
            </div>

            <span className="client-status vigente">
              Vigente
            </span>

            <button
              className="client-view-button"
              onClick={() =>
                setSelectedClient(client)
              }
            >
              Ver ficha
            </button>
          </div>
        ))}
      </div>

      {selectedClient && (
        <div
          className="client-modal-backdrop"
          onClick={() =>
            setSelectedClient(null)
          }
        >
          <div
            className="client-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              className="client-modal-close"
              onClick={() =>
                setSelectedClient(null)
              }
            >
              ✕
            </button>

            <div className="client-modal-left">
              <div className="client-modal-avatar">
                {getInitials(
                  selectedClient.full_name
                )}
              </div>

              <h2>
                {selectedClient.full_name}
              </h2>

              <p>
                {selectedClient.email ||
                  "Sin correo registrado"}
              </p>

              <span className="client-status vigente">
                Vigente
              </span>
            </div>

            <div className="client-modal-right">
              <h3>
                Perfil del cliente
              </h3>

              <div className="client-detail-grid">
                <span>Teléfono</span>

                <strong>
                  {selectedClient.phone ||
                    "Sin teléfono"}
                </strong>

                <span>Dirección</span>

                <strong>
                  {selectedClient.address ||
                    "Sin dirección"}
                </strong>

                <span>Ciudad</span>

                <strong>
                  {selectedClient.city ||
                    "Sin ciudad"}
                </strong>

                <span>Región</span>

                <strong>
                  {selectedClient.region ||
                    "Sin región"}
                </strong>
              </div>

              <div className="client-modal-actions">
                <button
                  onClick={() =>
                    handleEditClient(
                      selectedClient
                    )
                  }
                >
                  Editar cliente
                </button>

                <button
                  onClick={() =>
                    handleDeleteClient(
                      selectedClient
                    )
                  }
                >
                  Eliminar cliente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <SystemModal
        isOpen={modalOpen}
        type={modalType}
        title={modalTitle}
        message={modalMessage}
        confirmText={
          modalType === "warning"
            ? "Aceptar"
            : "Eliminar"
        }
        cancelText="Cancelar"
        showCancel={modalType === "error"}
        onConfirm={
          modalType === "warning"
            ? closeModal
            : confirmDeleteClient
        }
        onClose={closeModal}
      />
    </div>
  );
}