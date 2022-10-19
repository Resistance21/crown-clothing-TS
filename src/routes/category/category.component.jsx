import { React, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import {
  selectCategoriesMap,
  selectCategoriesLoading,
} from "../../store/categories/categories.selector.js";

import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component.jsx";

import { CatergoryContainer, CatergoryTitle } from "./category.styles.jsx";

const Catergory = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const catergoriesIsLoading = useSelector(selectCategoriesLoading);
  const [products, setProducts] = useState(
    categoriesMap[category.toLocaleLowerCase()]
  );
  useEffect(() => {
    setProducts(categoriesMap[category.toLocaleLowerCase()]);
  }, [categoriesMap, category]);

  return (
    <>
      <CatergoryTitle as="h2">{category.toUpperCase()}</CatergoryTitle>
      {catergoriesIsLoading ? (
        <Spinner />
      ) : (
        <CatergoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CatergoryContainer>
      )}
    </>
  );
};

export default Catergory;
