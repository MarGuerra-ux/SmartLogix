import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";

import "../../styles/ModulePages.css";
import "../../styles/TopSalesPage.css";

function formatPrice(value) {
  return `$${Number(value || 0).toLocaleString("es-CL", {
    maximumFractionDigits: 0,
  })}`;
}

function TopSalesPage() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    const [ordersRes, productsRes] = await Promise.all([
      supabase
        .from("orders")
        .select("*")
        .eq("status", "Aprobado"),

      supabase
        .from("products")
        .select("*"),
    ]);

    setOrders(ordersRes.data || []);
    setProducts(productsRes.data || []);

    setLoading(false);
  }

  const salesRanking = useMemo(() => {
    const map = {};

    orders.forEach((order) => {
      const product = products.find(
        (p) => p.id === order.product_id
      );

      if (!product) return;

      const name = product.name;

      if (!map[name]) {
        map[name] = {
          id: product.id,
          name: product.name,
          category: product.category || "General",
          quantity: 0,
          total: 0,
          stock: product.stock || 0,
        };
      }

      map[name].quantity += Number(
        order.quantity || 1
      );

      map[name].total += Number(
        order.total_amount || 0
      );
    });

    return Object.values(map).sort(
      (a, b) => b.total - a.total
    );
  }, [orders, products]);

  const totalRevenue = salesRanking.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const topThree = salesRanking.slice(0, 3);

  return (
    <section className="module-page">
      <div className="module-page-header">
        <span className="module-page-kicker">
          MÓDULO COMERCIAL
        </span>

        <h1 className="module-page-title">
          Top Ventas
        </h1>

        <p className="module-page-description">
          Productos con mejor rendimiento
          comercial dentro de SmartLogix.
        </p>
      </div>

      {loading ? (
        <div className="placeholder-card">
          <div className="placeholder-icon">
            ⏳
          </div>

          <h2>
            Cargando ranking comercial...
          </h2>

          <p>
            Obteniendo información desde
            Supabase.
          </p>
        </div>
      ) : (
        <>
          {/* KPI */}

          <div className="top-sales-kpi-grid">
            <article className="top-sales-kpi-card positive">
              <span>
                Ventas acumuladas
              </span>

              <strong>
                {formatPrice(
                  totalRevenue
                )}
              </strong>

              <p>
                Ingresos generados por
                productos vendidos.
              </p>
            </article>

            <article className="top-sales-kpi-card">
              <span>
                Productos vendidos
              </span>

              <strong>
                {salesRanking.length}
              </strong>

              <p>
                Productos con movimiento
                comercial.
              </p>
            </article>

            <article className="top-sales-kpi-card warning">
              <span>
                Producto líder
              </span>

              <strong>
                {topThree[0]?.name ||
                  "Sin datos"}
              </strong>

              <p>
                Producto con mayores
                ingresos.
              </p>
            </article>
          </div>

          {/* TOP 3 */}

          <div className="top-three-grid">
            {topThree.map(
              (product, index) => (
                <article
                  key={product.id}
                  className={`top-product-card rank-${index + 1}`}
                >
                  <div className="top-product-rank">
                    #{index + 1}
                  </div>

                  <h2>
                    {product.name}
                  </h2>

                  <p>
                    {product.category}
                  </p>

                  <strong>
                    {formatPrice(
                      product.total
                    )}
                  </strong>

                  <div className="top-product-stats">
                    <div>
                      <span>
                        Unidades
                      </span>

                      <strong>
                        {
                          product.quantity
                        }
                      </strong>
                    </div>

                    <div>
                      <span>
                        Stock
                      </span>

                      <strong
                        className={
                          product.stock <= 5
                            ? "warning-text"
                            : "positive-text"
                        }
                      >
                        {product.stock}
                      </strong>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>

          {/* TABLA */}

          <article className="top-sales-table-card">
            <div className="table-header">
              <div>
                <span>
                  RANKING GENERAL
                </span>

                <h2>
                  Productos más vendidos
                </h2>
              </div>
            </div>

            <div className="top-sales-table-wrapper">
              <table className="top-sales-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Unidades</th>
                    <th>Ingresos</th>
                    <th>Participación</th>
                    <th>Stock</th>
                  </tr>
                </thead>

                <tbody>
                  {salesRanking.map(
                    (
                      product,
                      index
                    ) => {
                      const participation =
                        totalRevenue > 0
                          ? (
                              (product.total /
                                totalRevenue) *
                              100
                            ).toFixed(1)
                          : 0;

                      return (
                        <tr
                          key={
                            product.id
                          }
                        >
                          <td>
                            <span className="ranking-badge">
                              #
                              {index +
                                1}
                            </span>
                          </td>

                          <td>
                            <strong>
                              {
                                product.name
                              }
                            </strong>
                          </td>

                          <td>
                            {
                              product.category
                            }
                          </td>

                          <td>
                            {
                              product.quantity
                            }
                          </td>

                          <td className="positive-text">
                            {formatPrice(
                              product.total
                            )}
                          </td>

                          <td>
                            <div className="participation-bar">
                              <div
                                className="participation-fill"
                                style={{
                                  width: `${participation}%`,
                                }}
                              />

                              <span>
                                {
                                  participation
                                }
                                %
                              </span>
                            </div>
                          </td>

                          <td>
                            <span
                              className={
                                product.stock <=
                                5
                                  ? "warning-badge"
                                  : "success-badge"
                              }
                            >
                              {
                                product.stock
                              }
                            </span>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </article>
        </>
      )}
    </section>
  );
}

export default TopSalesPage;