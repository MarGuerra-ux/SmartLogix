import { useEffect, useState } from "react";
import "../../styles/CategoriesPage.css";

import SystemModal from "../../components/ui/SystemModal";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/categoryService";

import { getProductsByCategoryName } from "../../services/productService";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [modalType, setModalType] = useState("error");
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showCancelButton, setShowCancelButton] = useState(false);

  async function loadCategories() {
    const data = await getCategories();
    setCategories(data);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const categoryData = {
      name,
      description,
    };

    if (editingId) {
      await updateCategory(editingId, categoryData);
    } else {
      await createCategory(categoryData);
    }

    setName("");
    setDescription("");
    setEditingId(null);

    loadCategories();
  }

  function handleEdit(category) {
    setEditingId(category.id);
    setName(category.name);
    setDescription(category.description || "");
  }

  async function handleDeleteClick(category) {
    const products = await getProductsByCategoryName(category.name);

    if (products.length > 0) {
      setSelectedCategory(null);
      setModalType("warning");
      setModalTitle("Operación bloqueada");
      setModalMessage(
        "Esta categoría contiene información asociada. Para eliminarla, primero debes reubicar o eliminar los productos vinculados."
      );
      setShowCancelButton(false);
      setModalOpen(true);
      return;
    }

    setSelectedCategory(category);
    setModalType("error");
    setModalTitle("Eliminar categoría");
    setModalMessage("¿Deseas eliminar esta categoría?");
    setShowCancelButton(true);
    setModalOpen(true);
  }

  async function confirmDeleteCategory() {
    if (!selectedCategory) return;

    await deleteCategory(selectedCategory.id);

    setModalOpen(false);
    setSelectedCategory(null);

    loadCategories();
  }

  function closeModal() {
    setModalOpen(false);
    setSelectedCategory(null);
  }

  return (
    <div className="categories-page">
      <div className="categories-header">
        <h1>Gestión de Categorías</h1>
        <p>Administra las categorías del catálogo.</p>
      </div>

      <form className="category-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre categoría"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">
          {editingId ? "Actualizar" : "Crear"}
        </button>
      </form>

      <div className="categories-table">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>

            <div className="category-actions">
              <button
                className="edit-btn"
                onClick={() => handleEdit(category)}
              >
                Editar
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDeleteClick(category)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <SystemModal
        isOpen={modalOpen}
        type={modalType}
        title={modalTitle}
        message={modalMessage}
        confirmText={modalType === "warning" ? "Aceptar" : "Eliminar"}
        cancelText="Cancelar"
        showCancel={showCancelButton}
        onConfirm={
          modalType === "warning" ? closeModal : confirmDeleteCategory
        }
        onClose={closeModal}
      />
    </div>
  );
}