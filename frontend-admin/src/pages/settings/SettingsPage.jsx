import "../../styles/ModulePages.css";
import "../../styles/SettingsPage.css";

function SettingsPage() {
  return (
    <section className="module-page">
      <div className="module-page-header">
        <span className="module-page-kicker">
          CONFIGURACIÓN DEL SISTEMA
        </span>

        <h1 className="module-page-title">
          Configuración
        </h1>

        <p className="module-page-description">
          Preferencias generales del sistema, integraciones,
          seguridad y parámetros operativos de SmartLogix.
        </p>
      </div>

      {/* ================================================= */}
      {/* SISTEMA */}
      {/* ================================================= */}

      <div className="settings-grid">
        <article className="settings-card">
          <div className="settings-card-header">
            <span className="settings-section-tag blue">
              SISTEMA
            </span>

            <h2>
              Estado general
            </h2>
          </div>

          <div className="settings-info-list">
            <div>
              <span>Versión ERP</span>
              <strong className="blue-text">
                SmartLogix v2.4
              </strong>
            </div>

            <div>
              <span>Supabase</span>
              <strong className="green-text">
                Conectado
              </strong>
            </div>

            <div>
              <span>Servidor API</span>
              <strong className="green-text">
                Operativo
              </strong>
            </div>

            <div>
              <span>Último respaldo</span>
              <strong className="blue-text">
                Hoy 02:14 AM
              </strong>
            </div>

            <div>
              <span>Administrador</span>
              <strong>
                Marco Guerra
              </strong>
            </div>
          </div>
        </article>

        {/* ================================================= */}
        {/* OPERACIONES */}
        {/* ================================================= */}

        <article className="settings-card">
          <div className="settings-card-header">
            <span className="settings-section-tag green">
              OPERACIONES
            </span>

            <h2>
              Automatización operacional
            </h2>
          </div>

          <div className="settings-switch-list">

            <div className="settings-switch-item">
              <div>
                <strong>
                  Aprobación manual de pedidos
                </strong>

                <p>
                  Validación visual antes de aprobar ventas.
                </p>
              </div>

              <div className="switch-active">
                ACTIVO
              </div>
            </div>

            <div className="settings-switch-item">
              <div>
                <strong>
                  Descuento automático de stock
                </strong>

                <p>
                  Actualización inmediata de inventario.
                </p>
              </div>

              <div className="switch-active">
                ACTIVO
              </div>
            </div>

            <div className="settings-switch-item">
              <div>
                <strong>
                  Creación automática de envío
                </strong>

                <p>
                  Generación logística posterior a aprobación.
                </p>
              </div>

              <div className="switch-warning">
                PARCIAL
              </div>
            </div>

            <div className="settings-switch-item">
              <div>
                <strong>
                  Generación automática de boleta
                </strong>

                <p>
                  Emisión PDF desde módulo comercial.
                </p>
              </div>

              <div className="switch-active">
                ACTIVO
              </div>
            </div>

          </div>
        </article>
      </div>

      {/* ================================================= */}
      {/* FINANZAS + SEGURIDAD */}
      {/* ================================================= */}

      <div className="settings-grid">

        <article className="settings-card">
          <div className="settings-card-header">
            <span className="settings-section-tag orange">
              FINANZAS
            </span>

            <h2>
              Configuración financiera
            </h2>
          </div>

          <div className="settings-info-list">

            <div>
              <span>IVA configurado</span>
              <strong className="blue-text">
                19%
              </strong>
            </div>

            <div>
              <span>Días máximos reembolso</span>
              <strong className="orange-text">
                5 días hábiles
              </strong>
            </div>

            <div>
              <span>Banco principal</span>
              <strong>
                Banco Estado
              </strong>
            </div>

            <div>
              <span>Correo financiero</span>
              <strong>
                finanzas@smartlogix.cl
              </strong>
            </div>

            <div>
              <span>Estado caja diaria</span>
              <strong className="green-text">
                Positiva
              </strong>
            </div>

          </div>
        </article>

        {/* ================================================= */}
        {/* SEGURIDAD */}
        {/* ================================================= */}

        <article className="settings-card">
          <div className="settings-card-header">
            <span className="settings-section-tag red">
              SEGURIDAD
            </span>

            <h2>
              Control de acceso
            </h2>
          </div>

          <div className="settings-info-list">

            <div>
              <span>Usuarios activos</span>
              <strong className="green-text">
                4 usuarios
              </strong>
            </div>

            <div>
              <span>Sesiones abiertas</span>
              <strong className="blue-text">
                2 sesiones
              </strong>
            </div>

            <div>
              <span>Último acceso</span>
              <strong>
                Hoy 13:42 PM
              </strong>
            </div>

            <div>
              <span>Rol actual</span>
              <strong className="green-text">
                Administrador
              </strong>
            </div>

            <div>
              <span>Estado firewall</span>
              <strong className="green-text">
                Protegido
              </strong>
            </div>

          </div>
        </article>
      </div>

      {/* ================================================= */}
      {/* INTEGRACIONES */}
      {/* ================================================= */}

      <article className="settings-card">
        <div className="settings-card-header">
          <span className="settings-section-tag blue">
            INTEGRACIONES
          </span>

          <h2>
            Servicios conectados
          </h2>
        </div>

        <div className="integration-grid">

          <div className="integration-card active">
            <h3>Supabase</h3>
            <p>Base de datos principal del sistema.</p>
            <span>Conectado</span>
          </div>

          <div className="integration-card active">
            <h3>PDF Generator</h3>
            <p>Motor de exportación de boletas PDF.</p>
            <span>Operativo</span>
          </div>

          <div className="integration-card normal">
            <h3>Correo SMTP</h3>
            <p>Servicio de envío automático de correos.</p>
            <span>Configuración parcial</span>
          </div>

          <div className="integration-card warning">
            <h3>Transbank</h3>
            <p>Pasarela de pagos y validaciones.</p>
            <span>Pendiente</span>
          </div>

          <div className="integration-card warning">
            <h3>WebPay</h3>
            <p>Integración financiera nacional.</p>
            <span>Pendiente</span>
          </div>

          <div className="integration-card critical">
            <h3>Respaldo Cloud</h3>
            <p>Sincronización secundaria externa.</p>
            <span>No configurado</span>
          </div>

        </div>
      </article>

      {/* ================================================= */}
      {/* ZONA PELIGROSA */}
      {/* ================================================= */}

      <article className="danger-zone-card">

        <div className="danger-zone-header">
          <span>
            ZONA CRÍTICA
          </span>

          <h2>
            Administración avanzada
          </h2>

          <p>
            Acciones sensibles que afectan directamente
            la operación y los datos de SmartLogix.
          </p>
        </div>

        <div className="danger-zone-actions">

          <button className="danger-button">
            Reiniciar sistema
          </button>

          <button className="danger-button">
            Vaciar pedidos demo
          </button>

          <button className="danger-button">
            Eliminar datos temporales
          </button>

        </div>

      </article>
    </section>
  );
}

export default SettingsPage;