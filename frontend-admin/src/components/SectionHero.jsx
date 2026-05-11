import "../styles/SectionHero.css";

export default function SectionHero({ icon, title, description }) {
  return (
    <section className="section-hero">
      <span className="section-hero-icon">{icon}</span>

      <h2>{title}</h2>

      <p>{description}</p>
    </section>
  );
}