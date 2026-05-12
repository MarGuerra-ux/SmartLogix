import { useEffect, useMemo, useState } from "react";

import SystemModal from "../../components/ui/SystemModal";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getOrderItemsByProductId,
} from "../../services/productService";

import {
  getCategories,
} from "../../services/categoryService";

import "../../styles/ProductsPage.css";
import "../../styles/ModulePages.css";

export default function ProductsPage() {
  const [products, setProducts] =
    useState([]);

  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState(null);

  const [
    openCategories,
    setOpenCategories,
  ] = useState({});

  const [categories, setCategories] =
    useState([]);

  const [
    showCreateForm,
    setShowCreateForm,
  ] = useState(false);

  const [
    editingProductId,
    setEditingProductId,
  ] = useState(null);

  const [productName, setProductName] =
    useState("");

  const [productSku, setProductSku] =
    useState("");

  const [
    productDescription,
    setProductDescription,
  ] = useState("");

  const [
    productCategory,
    setProductCategory,
  ] = useState("");

  const [productStock, setProductStock] =
    useState("");

  const [productPrice, setProductPrice] =
    useState("");

  const [
    productWarehouse,
    setProductWarehouse,
  ] = useState("");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [modalType, setModalType] =
    useState("warning");

  const [modalTitle, setModalTitle] =
    useState("");

  const [
    modalMessage,
    setModalMessage,
  ] = useState("");

  const [
    selectedProductToDelete,
    setSelectedProductToDelete,
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

  const groupedProducts = useMemo(() => {
    const sorted = [...products].sort(
      (a, b) => {
        if (
          a.category === b.category
        ) {
          return a.name.localeCompare(
            b.name
          );
        }

        return a.category.localeCompare(
          b.category
        );
      }
    );

    return sorted.reduce(
      (groups, product) => {
        if (
          !groups[product.category]
        ) {
          groups[product.category] = [];
        }

        groups[
          product.category
        ].push(product);

        return groups;
      },
      {}
    );
  }, [products]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price);

  async function handleCreateProduct(
    e
  ) {
    e.preventDefault();

    const productData = {
      name: productName,

      sku: productSku,

      description:
        productDescription,

      category: productCategory,

      stock_units:
        Number(productStock),

      unit_price:
        Number(productPrice),

      warehouse:
        productWarehouse,

      status:
        Number(productStock) <= 0
          ? "Agotado"
          : Number(productStock) <=
            10
          ? "Stock Bajo"
          : "Disponible",
    };

    if (editingProductId) {
      await updateProduct(
        editingProductId,
        productData
      );
    } else {
      await createProduct(
        productData
      );
    }

    setProductName("");
    setProductSku("");
    setProductDescription("");
    setProductCategory("");
    setProductStock("");
    setProductPrice("");
    setProductWarehouse("");

    setEditingProductId(null);

    setShowCreateForm(false);

    loadProducts();
  }

  function handleEditProduct(
    product
  ) {
    setEditingProductId(
      product.id
    );

    setProductName(product.name);

    setProductSku(product.sku);

    setProductDescription(
      product.description || ""
    );

    setProductCategory(
      product.category
    );

    setProductStock(
      product.stock_units
    );

    setProductPrice(
      product.unit_price
    );

    setProductWarehouse(
      product.warehouse || ""
    );

    setShowCreateForm(true);

    setSelectedProduct(null);
  }

  async function handleDeleteProduct(
    product
  ) {
    const orderItems =
      await getOrderItemsByProductId(
        product.id
      );

    if (orderItems.length > 0) {
      setModalType("warning");

      setModalTitle(
        "Operación bloqueada"
      );

      setModalMessage(
        "Este producto está asociado a pedidos registrados. No es posible eliminarlo."
      );

      setModalOpen(true);

      return;
    }

    setSelectedProductToDelete(
      product
    );

    setModalType("error");

    setModalTitle(
      "Eliminar producto"
    );

    setModalMessage(
      "¿Deseas eliminar este producto?"
    );

    setModalOpen(true);
  }

  async function confirmDeleteProduct() {
    if (
      !selectedProductToDelete
    )
      return;

    await deleteProduct(
      selectedProductToDelete.id
    );

    setModalOpen(false);

    setSelectedProductToDelete(
      null
    );

    setSelectedProduct(null);

    loadProducts();
  }

  return (
    <div className="products-page">
      <div className="module-page-header">
        <span className="module-page-kicker">
          MÓDULO DE CATÁLOGO
        </span>

        <h1 className="module-page-title">
          Productos
        </h1>

        <p className="module-page-description">
          Administra catálogo,
          precios, categorías y
          datos comerciales de cada
          producto.
        </p>
      </div>

      <div className="products-toolbar">
        <input
          type="text"
          placeholder="Buscar producto..."
        />

        <button
          onClick={() =>
            setShowCreateForm(
              !showCreateForm
            )
          }
        >
          + Nuevo Producto
        </button>
      </div>

      {showCreateForm && (
        <form
          className="product-create-form"
          onSubmit={
            handleCreateProduct
          }
        >
          <input
            type="text"
            placeholder="Nombre"
            value={productName}
            onChange={(e) =>
              setProductName(
                e.target.value
              )
            }
            required
          />

          <input
            type="text"
            placeholder="SKU"
            value={productSku}
            onChange={(e) =>
              setProductSku(
                e.target.value
              )
            }
            required
          />

          <textarea
            placeholder="Descripción"
            value={
              productDescription
            }
            onChange={(e) =>
              setProductDescription(
                e.target.value
              )
            }
          />

          <select
            value={
              productCategory
            }
            onChange={(e) =>
              setProductCategory(
                e.target.value
              )
            }
            required
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
            type="number"
            placeholder="Stock"
            value={productStock}
            onChange={(e) =>
              setProductStock(
                e.target.value
              )
            }
            required
          />

          <input
            type="number"
            placeholder="Precio"
            value={productPrice}
            onChange={(e) =>
              setProductPrice(
                e.target.value
              )
            }
            required
          />

          <input
            type="text"
            placeholder="Bodega"
            value={
              productWarehouse
            }
            onChange={(e) =>
              setProductWarehouse(
                e.target.value
              )
            }
          />

          <button type="submit">
            {editingProductId
              ? "Actualizar producto"
              : "Crear producto"}
          </button>
        </form>
      )}

      <div className="products-list">
        {Object.entries(
          groupedProducts
        ).map(
          ([category, items]) => {
            const isOpen =
              openCategories[
                category
              ] ?? true;

            return (
              <section
                className="products-category-block"
                key={category}
              >
                <button
                  className="products-category-header"
                  onClick={() =>
                    setOpenCategories(
                      (
                        prev
                      ) => ({
                        ...prev,

                        [category]:
                          !isOpen,
                      })
                    )
                  }
                >
                  <div className="products-category-title">
                    <h3>
                      {category}
                    </h3>

                    <span className="products-category-count">
                      {
                        items.length
                      }{" "}
                      productos
                    </span>
                  </div>

                  <strong className="products-category-arrow">
                    {isOpen
                      ? "▲"
                      : "▼"}
                  </strong>
                </button>

                {isOpen && (
                  <div className="products-category-content">
                    {items.map(
                      (
                        product
                      ) => (
                        <div
                          className="product-card"
                          key={
                            product.id
                          }
                        >
                          <div className="product-main-info">
                            <strong>
                              {
                                product.name
                              }
                            </strong>

                            <span>
                              {
                                product.sku
                              }
                            </span>
                          </div>

                          <div className="product-price">
                            {formatPrice(
                              product.unit_price
                            )}
                          </div>

                          <div className="product-stock">
                            Stock:{" "}
                            {
                              product.stock_units
                            }
                          </div>

                          <span
                            className={`product-status ${product.status
                              .toLowerCase()
                              .replace(
                                " ",
                                "-"
                              )}`}
                          >
                            {
                              product.status
                            }
                          </span>

                          <button
                            onClick={() => {
                              setSelectedProduct(
                                product
                              );
                            }}
                          >
                            Ver ficha
                          </button>
                        </div>
                      )
                    )}
                  </div>
                )}
              </section>
            );
          }
        )}
      </div>

      {selectedProduct && (
        <div
          className="product-modal-backdrop"
          onClick={() =>
            setSelectedProduct(
              null
            )
          }
        >
          <div
            className="product-modal carousel-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={() =>
                setSelectedProduct(
                  null
                )
              }
            >
              ✕
            </button>

            <div className="product-modal-image-panel">
              <h2>
                {
                  selectedProduct.name
                }
              </h2>

              <p>
                {
                  selectedProduct.sku
                }
              </p>

              <span
                className={`product-status ${selectedProduct.status
                  .toLowerCase()
                  .replace(
                    " ",
                    "-"
                  )}`}
              >
                {
                  selectedProduct.status
                }
              </span>
            </div>

            <div className="product-modal-info-panel">
              <div className="carousel-content">
                <div className="carousel-body">
                  <small className="carousel-label">
                    Resumen
                  </small>

                  <h3>
                    Resumen del
                    producto
                  </h3>

                  <p>
                    {
                      selectedProduct.description
                    }
                  </p>

                  <div className="product-detail-grid">
                    <span>
                      Categoría
                    </span>

                    <strong>
                      {
                        selectedProduct.category
                      }
                    </strong>

                    <span>
                      Precio
                    </span>

                    <strong>
                      {formatPrice(
                        selectedProduct.unit_price
                      )}
                    </strong>

                    <span>
                      Stock
                    </span>

                    <strong>
                      {
                        selectedProduct.stock_units
                      }
                    </strong>

                    <span>
                      Bodega
                    </span>

                    <strong>
                      {
                        selectedProduct.warehouse
                      }
                    </strong>
                  </div>
                </div>

                <div className="modal-actions">
                  <button
                    onClick={() =>
                      handleEditProduct(
                        selectedProduct
                      )
                    }
                  >
                    Editar producto
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteProduct(
                        selectedProduct
                      )
                    }
                  >
                    Eliminar producto
                  </button>
                </div>
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
          modalType ===
          "warning"
            ? "Aceptar"
            : "Eliminar"
        }
        cancelText="Cancelar"
        showCancel={
          modalType === "error"
        }
        onConfirm={
          modalType ===
          "warning"
            ? () =>
                setModalOpen(
                  false
                )
            : confirmDeleteProduct
        }
        onClose={() => {
          setModalOpen(false);

          setSelectedProductToDelete(
            null
          );
        }}
      />
    </div>
  );
}
