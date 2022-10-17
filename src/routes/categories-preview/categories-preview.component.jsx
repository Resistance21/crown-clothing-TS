import { React, useContext, Fragment } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categories.selector.js";

import CatergoryPreview from "../../components/category-preview/category-preview.component";

import "./categories-preview.styles.scss";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <div className="categories-preview-container">
      {categoriesMap.map((product) => {
        return (
          <CatergoryPreview
            key={product.title}
            title={product.title}
            products={product.items}
          />
        );
      })}
    </div>
  );
};

export default CategoriesPreview;
