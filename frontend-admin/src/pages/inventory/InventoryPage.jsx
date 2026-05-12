import { useEffect, useState } from "react";

import SystemModal from "../../components/ui/SystemModal";

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  getOrderItemsByProductId,
} from "../../services/productService";

import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../services/categoryService";

import "../../styles/ModulePages.css";
import "../../styles/InventoryPage.css";

const emptyProductForm = {
  name: "",
  sku: "",
  description: "",
  category: "",
  stock_units: "",
  unit_price: "",
  warehouse: "",
  status: "Disponible",
};

const emptyCategoryForm = {
  id: "",
  name: "",
  description: "",
};

function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState(emptyProductForm);

  const [categoryForm, setCategoryForm] =
    useState(emptyCategoryForm);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState(null);

  const [
    isCategoryMenuOpen,
    setIsCategoryMenuOpen,
  ] = useState(false);

  const [
    isCategoryModalOpen,
    setIsCategoryModalOpen,
  ] = useState(false);

  const [categoryAction, setCategoryAction] =
    useState(null);

  const [
    systemModalOpen,
    setSystemModalOpen,
  ] = useState(false);

  const [
    systemModalType,
    setSystemModalType,
  ] = useState("warning");

  const [
    systemModalTitle,
    setSystemModalTitle,
  ] = useState("");

  const [
    systemModalMessage,
    setSystemModalMessage,
  ] = useState("");

  const [
    systemModalAction,
    setSystemModalAction,
  ] = useState(null);

  async function loadProducts() {
    setProducts(await getProducts());
  }

  async function loadCategories() {
    setCategories(await getCategories());
  }

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  function openCreateModal() {
    setEditingProduct(null);

    setForm(emptyProductForm);

    setIsModalOpen(true);
  }

  function openEditModal(product) {
    setEditingProduct(product);

    setForm({
      name: product.name || "",
      sku: product.sku || "",
      description:
        product.description || "",
      category: product.category || "",
      stock_units:
        product.stock_units || "",
      unit_price:
        product.unit_price || "",
      warehouse:
        product.warehouse || "",
      status:
        product.status || "Disponible",
    });

    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);

    setEditingProduct(null);

    setForm(emptyProductForm);
  }

  function clearForm() {
    setForm(emptyProductForm);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const stock = Number(form.stock_units);

    const productData = {
      name: form.name,
      sku: form.sku,
      description: form.description,
      category: form.category,
      stock_units: stock,
      unit_price: Number(form.unit_price),
      warehouse: form.warehouse,

      status:
        stock <= 0
          ? "Agotado"
          : stock <= 10
          ? "Stock Bajo"
          : "Disponible",

      updated_at:
        new Date().toISOString(),
    };

    const result = editingProduct
      ? await updateProduct(
          editingProduct.id,
          productData
        )
      : await createProduct(productData);

    if (result.success) {
      await loadProducts();

      closeModal();
    }
  }

  async function handleDelete(product) {
    const orderItems =
      await getOrderItemsByProductId(
        product.id
      );

    if (orderItems.length > 0) {
      setSystemModalType("warning");

      setSystemModalTitle(
        "Operación bloqueada"
      );

      setSystemModalMessage(
        "Este producto está asociado a pedidos registrados. No es posible eliminarlo."
      );

      setSystemModalAction(null);

      setSystemModalOpen(true);

      return;
    }

    setSystemModalType("error");

    setSystemModalTitle(
      "Eliminar producto"
    );

    setSystemModalMessage(
      `¿Deseas eliminar el producto "${product.name}"?`
    );

    setSystemModalAction(
      () => async () => {
        const result =
          await deleteProduct(
            product.id
          );

        if (result.success) {
          await loadProducts();
        }

        closeSystemModal();
      }
    );

    setSystemModalOpen(true);
  }

  function openCategoryModal(action) {
    setCategoryAction(action);

    setCategoryForm(
      emptyCategoryForm
    );

    setIsCategoryMenuOpen(false);

    setIsCategoryModalOpen(true);
  }

  function closeCategoryModal() {
    setCategoryAction(null);

    setCategoryForm(
      emptyCategoryForm
    );

    setIsCategoryModalOpen(false);
  }

  function clearCategoryForm() {
    setCategoryForm(
      emptyCategoryForm
    );
  }

  function handleCategoryChange(event) {
    const { name, value } =
      event.target;

    if (name === "id") {
      const selectedCategory =
        categories.find(
          (category) =>
            String(category.id) === value
        );

      setCategoryForm({
        id: value,

        name:
          selectedCategory?.name || "",

        description:
          selectedCategory?.description ||
          "",
      });

      return;
    }

    setCategoryForm({
      ...categoryForm,
      [name]: value,
    });
  }

  async function handleCategorySubmit(
    event
  ) {
    event.preventDefault();

    let result;

    if (categoryAction === "create") {
      result =
        await createCategory({
          name: categoryForm.name,

          description:
            categoryForm.description,
        });
    }

    if (categoryAction === "edit") {
      result =
        await updateCategory(
          categoryForm.id,
          {
            name:
              categoryForm.name,

            description:
              categoryForm.description,

            updated_at:
              new Date().toISOString(),
          }
        );
    }

    if (categoryAction === "delete") {
      const productsInsideCategory =
        products.filter(
          (product) =>
            product.category ===
            categoryForm.name
        );

      if (
        productsInsideCategory.length > 0
      ) {
        setSystemModalType(
          "warning"
        );

        setSystemModalTitle(
          "Operación bloqueada"
        );

        setSystemModalMessage(
          "Esta categoría contiene información asociada. Para eliminarla, primero debes reubicar o eliminar los productos vinculados."
        );

        setSystemModalAction(null);

        setSystemModalOpen(true);

        return;
      }

      setSystemModalType("error");

      setSystemModalTitle(
        "Eliminar categoría"
      );

      setSystemModalMessage(
        `¿Deseas eliminar la categoría "${categoryForm.name}"?`
      );

      setSystemModalAction(
        () => async () => {
          const deleteResult =
            await deleteCategory(
              categoryForm.id
            );

          if (
            deleteResult.success
          ) {
            await loadCategories();

            closeCategoryModal();
          }

          closeSystemModal();
        }
      );

      setSystemModalOpen(true);

      return;
    }

    if (result?.success) {
      await loadCategories();

      closeCategoryModal();
    }
  }

  function closeSystemModal() {
    setSystemModalOpen(false);

    setSystemModalAction(null);
  }

  return (
    <section className="module-page">
      <div className="module-page-header">
        <span className="module-page-kicker">
          MÓDULO DE INVENTARIO
        </span>

        <h1 className="module-page-title">
          Inventario
        </h1>

        <p className="module-page-description">
          Ingreso, control y consulta
          de mercadería conectada a
          Supabase.
        </p>
      </div>

      <div className="inventory-actions">
        <button
          className="primary-button"
          onClick={openCreateModal}
        >
          + Agregar producto
        </button>

        <div className="dropdown-wrapper">
          <button
            className="secondary-button"
            onClick={() =>
              setIsCategoryMenuOpen(
                !isCategoryMenuOpen
              )
            }
          >
            + Categoría ▶
          </button>

          {isCategoryMenuOpen && (
            <div className="dropdown-menu">
              <button
                onClick={() =>
                  openCategoryModal(
                    "create"
                  )
                }
              >
                Agregar categoría
              </button>

              <button
                onClick={() =>
                  openCategoryModal(
                    "edit"
                  )
                }
              >
                Editar categoría
              </button>

              <button
                onClick={() =>
                  openCategoryModal(
                    "delete"
                  )
                }
              >
                Eliminar categoría
              </button>
            </div>
          )}
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Producto</th>

            <th>SKU</th>

            <th>Categoría</th>

            <th>Stock</th>

            <th>Precio</th>

            <th>Bodega</th>

            <th>Estado</th>

            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>

              <td>{product.sku}</td>

              <td>
                {product.category}
              </td>

              <td>
                {product.stock_units}
                {" "}unidades
              </td>

              <td>
                $
                {Number(
                  product.unit_price
                ).toLocaleString(
                  "es-CL"
                )}
              </td>

              <td>
                {product.warehouse}
              </td>

              <td>
                <span className="badge">
                  {product.status}
                </span>
              </td>

              <td>
                <div className="table-actions">
                  <button
                    className="action-button edit"
                    onClick={() =>
                      openEditModal(
                        product
                      )
                    }
                  >
                    Editar
                  </button>

                  <button
                    className="action-button delete"
                    onClick={() =>
                      handleDelete(
                        product
                      )
                    }
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-backdrop">
          <article className="modal-card">
            <div className="modal-header">
              <div>
                <h3>
                  {editingProduct
                    ? "Modificar producto"
                    : "Ingreso de nueva mercadería"}
                </h3>

                <p>
                  {editingProduct
                    ? "Actualiza los datos del producto seleccionado."
                    : "Completa los datos para registrar un nuevo producto."}
                </p>
              </div>

              <button
                className="modal-close"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>

            <form
              className="module-form modal-form"
              onSubmit={
                handleSubmit
              }
            >
              <div className="form-grid">
                <input
                  name="name"
                  placeholder="Nombre del producto"
                  value={form.name}
                  onChange={
                    handleChange
                  }
                  required
                />

                <input
                  name="sku"
                  placeholder="SKU del producto"
                  value={form.sku}
                  onChange={
                    handleChange
                  }
                  required
                />

                <select
                  name="category"
                  value={
                    form.category
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option value="">
                    Seleccionar categoría
                  </option>

                  {categories.map(
                    (category) => (
                      <option
                        key={
                          category.id
                        }
                        value={
                          category.name
                        }
                      >
                        {
                          category.name
                        }
                      </option>
                    )
                  )}
                </select>

                <input
                  name="stock_units"
                  type="number"
                  min="0"
                  placeholder="Stock en unidades"
                  value={
                    form.stock_units
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

                <input
                  name="unit_price"
                  type="number"
                  min="0"
                  placeholder="Precio unitario"
                  value={
                    form.unit_price
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

                <input
                  name="warehouse"
                  placeholder="Bodega"
                  value={
                    form.warehouse
                  }
                  onChange={
                    handleChange
                  }
                />

                <select
                  name="status"
                  value={
                    form.status
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option value="Disponible">
                    Disponible
                  </option>

                  <option value="Stock Bajo">
                    Stock Bajo
                  </option>

                  <option value="Agotado">
                    Agotado
                  </option>
                </select>

                <textarea
                  name="description"
                  placeholder="Descripción del producto"
                  value={
                    form.description
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              <div className="modal-actions">
                <button
                  type="submit"
                  className="primary-button"
                >
                  {editingProduct
                    ? "Guardar cambios"
                    : "Agregar producto"}
                </button>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={
                    clearForm
                  }
                >
                  Limpiar campos
                </button>

                <button
                  type="button"
                  className="danger-outline-button"
                  onClick={
                    closeModal
                  }
                >
                  Cerrar
                </button>
              </div>
            </form>
          </article>
        </div>
      )}

      {isCategoryModalOpen && (
        <div className="modal-backdrop">
          <article className="modal-card small-modal-card">
            <div className="modal-header">
              <div>
                <h3>
                  {categoryAction ===
                    "create" &&
                    "Agregar categoría"}

                  {categoryAction ===
                    "edit" &&
                    "Editar categoría"}

                  {categoryAction ===
                    "delete" &&
                    "Eliminar categoría"}
                </h3>

                <p>
                  Administración independiente
                  de categorías del
                  inventario.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={
                  closeCategoryModal
                }
              >
                ✕
              </button>
            </div>

            <form
              className="module-form modal-form"
              onSubmit={
                handleCategorySubmit
              }
            >
              <div className="form-grid single-column-form">
                {(categoryAction ===
                  "edit" ||
                  categoryAction ===
                    "delete") && (
                  <select
                    name="id"
                    value={
                      categoryForm.id
                    }
                    onChange={
                      handleCategoryChange
                    }
                    required
                  >
                    <option value="">
                      Seleccionar categoría
                    </option>

                    {categories.map(
                      (
                        category
                      ) => (
                        <option
                          key={
                            category.id
                          }
                          value={
                            category.id
                          }
                        >
                          {
                            category.name
                          }
                        </option>
                      )
                    )}
                  </select>
                )}

                {categoryAction !==
                  "delete" && (
                  <>
                    <input
                      name="name"
                      placeholder="Nombre de la categoría"
                      value={
                        categoryForm.name
                      }
                      onChange={
                        handleCategoryChange
                      }
                      required
                    />

                    <textarea
                      name="description"
                      placeholder="Descripción de la categoría"
                      value={
                        categoryForm.description
                      }
                      onChange={
                        handleCategoryChange
                      }
                    />
                  </>
                )}

                {categoryAction ===
                  "delete" && (
                  <p className="delete-warning">
                    Selecciona una
                    categoría para
                    eliminarla del
                    sistema.
                  </p>
                )}
              </div>

              <div className="modal-actions">
                <button
                  type="submit"
                  className={
                    categoryAction ===
                    "delete"
                      ? "action-button delete"
                      : "primary-button"
                  }
                >
                  {categoryAction ===
                    "create" &&
                    "Agregar categoría"}

                  {categoryAction ===
                    "edit" &&
                    "Guardar cambios"}

                  {categoryAction ===
                    "delete" &&
                    "Eliminar categoría"}
                </button>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={
                    clearCategoryForm
                  }
                >
                  Limpiar campos
                </button>

                <button
                  type="button"
                  className="danger-outline-button"
                  onClick={
                    closeCategoryModal
                  }
                >
                  Cerrar
                </button>
              </div>
            </form>
          </article>
        </div>
      )}

      <SystemModal
        isOpen={
          systemModalOpen
        }
        type={systemModalType}
        title={
          systemModalTitle
        }
        message={
          systemModalMessage
        }
        confirmText={
          systemModalType ===
          "warning"
            ? "Aceptar"
            : "Eliminar"
        }
        cancelText="Cancelar"
        showCancel={
          systemModalType ===
          "error"
        }
        onConfirm={
          systemModalAction ||
          closeSystemModal
        }
        onClose={
          closeSystemModal
        }
      />
    </section>
  );
}

export default InventoryPage;