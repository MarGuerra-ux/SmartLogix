import "../../styles/SystemModal.css";

function SystemModal({
  isOpen,
  type = "warning",
  title,
  message,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  onConfirm,
  onClose,
  showCancel = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="system-modal-overlay">

      <div className={`system-modal ${type}`}>

        <div className="system-modal-header">

          <h2>{title}</h2>

        </div>

        <div className="system-modal-body">

          <p>{message}</p>

        </div>

        <div className="system-modal-actions">

          {showCancel && (
            <button
              className="modal-btn cancel-btn"
              onClick={onClose}
            >
              {cancelText}
            </button>
          )}

          <button
            className={`modal-btn confirm-btn ${type}`}
            onClick={onConfirm || onClose}
          >
            {confirmText}
          </button>

        </div>

      </div>

    </div>
  );
}

export default SystemModal;