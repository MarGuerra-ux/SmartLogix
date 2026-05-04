import { useNavigate } from "react-router-dom";
import "../../styles/CategoryCard.css";

function CategoryCard({ title, description, icon, path }) {
  const navigate = useNavigate();

  return (
    <div className="category-card" onClick={() => navigate(path)}>
      <div className="category-icon">{icon}</div>
      <h2 className="category-title">{title}</h2>
      <p className="category-description">{description}</p>
      <button className="category-button">Entrar</button>
    </div>
  );
}

export default CategoryCard;