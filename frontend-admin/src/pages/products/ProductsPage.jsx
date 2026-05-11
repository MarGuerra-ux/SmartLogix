import { useMemo, useState } from "react";
import SectionHero from "../../components/SectionHero";
import products from "../../data/products.json";
import "../../styles/ProductsPage.css";

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openCategories, setOpenCategories] = useState({});
  const [activeSlide, setActiveSlide] = useState(0);

  const groupedProducts = useMemo(() => {
    const sorted = [...products].sort((a, b) => {
      if (a.category === b.category) {
        return a.name.localeCompare(b.name);
      }

      return a.category.localeCompare(b.category);
    });

    return sorted.reduce((groups, product) => {
      if (!groups[product.category]) {
        groups[product.category] = [];
      }

      groups[product.category].push(product);
      return groups;
    }, {});
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price);
  };

  const slides = [
    {
      label: "Resumen / 8",
      title: "Resumen del producto",
      description: selectedProduct?.description,
      content: selectedProduct && (
        <div className="product-detail-grid">
          <span>Categoría</span>
          <strong>{selectedProduct.category}</strong>

          <span>Marca</span>
          <strong>{selectedProduct.brand}</strong>

          <span>Precio</span>
          <strong>{formatPrice(selectedProduct.price)}</strong>

          <span>Stock</span>
          <strong>{selectedProduct.stock}</strong>
        </div>
      ),
      actions: (
        <>
          <button>Editar producto</button>
          <button>Desactivar</button>
        </>
      ),
    },
    {
      label: "Ventas / 8",
      title: "Estadísticas de ventas",
      description: "Rendimiento comercial del producto.",
      content: (
        <div className="modal-metrics">
          <div>
            <strong>48</strong>
            <span>Ventas del mes</span>
          </div>
          <div>
            <strong>{formatPrice(2490000)}</strong>
            <span>Ingresos</span>
          </div>
          <div>
            <strong>12%</strong>
            <span>Crecimiento</span>
          </div>
        </div>
      ),
      actions: (
        <>
          <button>Ver estadísticas</button>
          <button>Exportar reporte</button>
        </>
      ),
    },
    {
      label: "Inventario / 8",
      title: "Inventario",
      description: "Control de stock y reposición.",
      content: selectedProduct && (
        <div className="product-detail-grid">
          <span>Stock actual</span>
          <strong>{selectedProduct.stock}</strong>

          <span>Stock mínimo</span>
          <strong>5</strong>

          <span>Bodega</span>
          <strong>Central</strong>
        </div>
      ),
      actions: (
        <>
          <button>Ajustar stock</button>
          <button>Solicitar reposición</button>
        </>
      ),
    },
    {
      label: "Proveedor / 8",
      title: "Proveedor",
      description: "Datos de contacto y abastecimiento.",
      content: (
        <div className="product-detail-grid">
          <span>Proveedor</span>
          <strong>Smart Supply Chile</strong>

          <span>Correo</span>
          <strong>ventas@smartsupply.cl</strong>

          <span>Entrega promedio</span>
          <strong>3 días hábiles</strong>
        </div>
      ),
      actions: (
        <>
          <button>Contactar proveedor</button>
          <button>Crear orden de compra</button>
        </>
      ),
    },
    {
      label: "Comentarios / 8",
      title: "Comentarios y valoraciones",
      description: "Opiniones recientes de clientes.",
      content: (
        <div className="modal-comments">
          <p>⭐ 4.8 promedio</p>
          <p>“Buen producto, llegó rápido.”</p>
          <p>“Excelente relación precio/calidad.”</p>
        </div>
      ),
      actions: (
        <>
          <button>Ver comentarios</button>
          <button>Responder valoración</button>
        </>
      ),
    },
    {
      label: "Devoluciones / 8",
      title: "Devoluciones",
      description: "Solicitudes y motivos frecuentes.",
      content: (
        <div className="modal-metrics">
          <div>
            <strong>2</strong>
            <span>Solicitudes</span>
          </div>
          <div>
            <strong>1</strong>
            <span>Aprobada</span>
          </div>
          <div>
            <strong>1</strong>
            <span>En revisión</span>
          </div>
        </div>
      ),
      actions: (
        <>
          <button>Revisar devoluciones</button>
          <button>Ver motivos</button>
        </>
      ),
    },
    {
      label: "Promociones / 8",
      title: "Promociones",
      description: "Gestión de descuentos y campañas.",
      content: (
        <div className="product-detail-grid">
          <span>Descuento activo</span>
          <strong>No</strong>

          <span>Campaña</span>
          <strong>Sin campaña</strong>
        </div>
      ),
      actions: (
        <>
          <button>Crear descuento</button>
          <button>Programar oferta</button>
        </>
      ),
    },
    {
      label: "Historial / 8",
      title: "Historial",
      description: "Últimos movimientos registrados.",
      content: (
        <div className="modal-history">
          <p>10/05 - Precio actualizado por Marco</p>
          <p>09/05 - Stock modificado</p>
          <p>08/05 - Producto creado</p>
        </div>
      ),
      actions: (
        <>
          <button>Ver historial completo</button>
          <button>Exportar</button>
        </>
      ),
    },
  ];

  const previousSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = slides[activeSlide];

  return (
    <div className="products-page">
      <SectionHero
        kicker="MÓDULO DE CATÁLOGO"
        title="Productos"
        description="Administra catálogo, precios, categorías y datos comerciales de cada producto."
      />

      <div className="products-toolbar">
        <input type="text" placeholder="Buscar producto..." />
        <button>+ Nuevo Producto</button>
      </div>

      <div className="products-list">
        {Object.entries(groupedProducts).map(([category, items]) => {
          const isOpen = openCategories[category] ?? true;

          return (
            <section className="product-category-block" key={category}>
              <button
                className="product-category-header"
                onClick={() =>
                  setOpenCategories((prev) => ({
                    ...prev,
                    [category]: !isOpen,
                  }))
                }
              >
                <span>{category}</span>
                <small>{items.length} productos</small>
                <strong>{isOpen ? "▲" : "▼"}</strong>
              </button>

              {isOpen && (
                <div className="product-table">
                  {items.map((product) => (
                    <div className="product-row" key={product.id}>
                      <div>
                        <strong>{product.name}</strong>
                        <span>{product.sku}</span>
                      </div>

                      <div>{product.brand}</div>
                      <div>{formatPrice(product.price)}</div>
                      <div>Stock: {product.stock}</div>

                      <span
                        className={`product-status ${product.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {product.status}
                      </span>

                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setActiveSlide(0);
                        }}
                      >
                        Ver ficha
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {selectedProduct && (
        <div
          className="product-modal-backdrop"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="product-modal carousel-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>

            <div className="product-modal-image-panel">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
              <h2>{selectedProduct.name}</h2>
              <p>{selectedProduct.sku}</p>
              <span
                className={`product-status ${selectedProduct.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {selectedProduct.status}
              </span>
            </div>

            <div className="product-modal-info-panel">
              <button className="carousel-arrow left" onClick={previousSlide}>
                ←
              </button>

              <div className="carousel-content">
                <div className="carousel-body">
                  <small className="carousel-label">
                    {currentSlide.label}
                  </small>

                  <h3>{currentSlide.title}</h3>

                  <p>{currentSlide.description}</p>

                  {currentSlide.content}
                </div>

                <div className="modal-actions">
                  {currentSlide.actions}
                </div>

                <div className="carousel-dots">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.label}
                      className={activeSlide === index ? "active" : ""}
                      onClick={() => setActiveSlide(index)}
                    />
                  ))}
                </div>
              </div>

              <button className="carousel-arrow right" onClick={nextSlide}>
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}