import CategoryCard from "../../components/dashboard/CategoryCard";
import "../../styles/dashboard.css";

function DashboardPage() {
  const categories = [
    {
      title: "Inventarios",
      description: "Gestiona stock, productos y disponibilidad.",
      icon: "📦",
      path: "/inventory",
    },
    {
      title: "Pedidos",
      description: "Administra pedidos y estados.",
      icon: "🧾",
      path: "/orders",
    },
    {
      title: "Envíos",
      description: "Coordina despachos y seguimiento.",
      icon: "🚚",
      path: "/shipping",
    },
  ];

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <p className="dashboard-label">Portal Administrativo</p>
        <h1>SmartLogix</h1>
        <p>Gestión logística moderna para eCommerce</p>
      </div>

      <div className="dashboard-grid">
        {categories.map((category) => (
          <CategoryCard key={category.title} {...category} />
        ))}
      </div>
    </section>
  );
}

export default DashboardPage;