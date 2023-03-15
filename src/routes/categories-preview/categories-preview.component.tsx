import { useSelector } from "react-redux";
import {
  selectCategoriesMap,
  selectCategoriesLoading,
} from "../../store/categories/categories.selector";

import CatergoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";

import "./categories-preview.styles.scss";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesLoading);

  return (
    <div className="categories-preview-container">
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title: string) => {
          const product = categoriesMap[title];
          return (
            <CatergoryPreview key={title} title={title} products={product} />
          );
        })
      )}
    </div>
  );
};

export default CategoriesPreview;
