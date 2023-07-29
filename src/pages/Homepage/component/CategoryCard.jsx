import {Link} from "react-router-dom";

export const CategoryCard = ({ category }) => {
  return (
    <Link className="category-card" to={`/${category.category}`}>
      <div>
        <img src={category.thumbnail} alt={category.category} />
      </div>
      <p>{category.category}</p>
    </Link>
  );
};
