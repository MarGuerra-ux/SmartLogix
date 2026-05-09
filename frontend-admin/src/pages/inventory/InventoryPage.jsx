import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import "../../styles/ModulePages.css";

function InventoryPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }

    loadProducts();
  }, []);

  return (
    <section className="module-page">
      <div className="module-header">
        <h2>Gestión de Inventario</h2>
        <p>
          Productos conectados directamente desde Supabase PostgreSQL.
        </p>
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
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.sku}</td>
              <td>{product.category}</td>
              <td>{product.stock_units}</td>
              <td>
                $
                {Number(product.unit_price).toLocaleString("es-CL")}
              </td>
              <td>{product.warehouse}</td>
              <td>
                <span className="badge">
                  {product.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default InventoryPage;