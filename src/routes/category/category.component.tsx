import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import {
  selectCategoriesMap,
  selectCategoriesLoading,
} from "../../store/categories/categories.selector";

import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";

import { CatergoryContainer, CatergoryTitle } from "./category.styles";

const Catergory = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const catergoriesIsLoading = useSelector(selectCategoriesLoading);

  const [products, setProducts] = useState(
    category && categoriesMap[category.toLocaleLowerCase()]
  );
  useEffect(() => {
    setProducts(category && categoriesMap[category.toLocaleLowerCase()]);
  }, [categoriesMap, category]);

  return (
    <>
      <CatergoryTitle as="h2">
        {category && category.toUpperCase()}
      </CatergoryTitle>
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
