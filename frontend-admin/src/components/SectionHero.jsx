import "../styles/SectionHero.css";

export default function SectionHero({
  kicker = "MÓDULO",
  title,
  description,
}) {
  return (
    <section className="section-hero">
      <p className="section-hero-kicker">{kicker}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}