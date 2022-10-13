import { React, useContext, Fragment } from "react";

import { CategoriesContext } from "../../contexts/categories.context";
import CatergoryPreview from "../../components/category-preview/category-preview.component";

import "./categories-preview.styles.scss";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <div className="categories-preview-container">
      {Object.keys(categoriesMap).map((title) => {
        return (
          <CatergoryPreview
            key={title}
            title={title}
            products={categoriesMap[title]}
          />
        );
      })}
    </div>
  );
};

export default CategoriesPreview;
