import { useDataContext } from "../../context/data/DataContext";
import { CategoryCard } from "./component/CategoryCard";

import "./homepage.layout.css"

export const Homepage = () => {
  const { categories } = useDataContext();

  return (
    <div className="homepage-container">
      <h1>Categories</h1>
      <div className="categories-container">
        {categories.map((category) => (
          <CategoryCard category={category} key={category._id} />
        ))}
      </div>
    </div>
  );
};
