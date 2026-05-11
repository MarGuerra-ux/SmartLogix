import "../../styles/PlaceholderPage.css";

function PlaceholderPage({ title, description, icon }) {
  return (
    <section className="placeholder-page">
      <div className="placeholder-card">
        <span className="placeholder-icon">{icon}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </section>
  );
}

export default PlaceholderPage;