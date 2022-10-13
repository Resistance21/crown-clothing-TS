import { React, useContext, useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

import { CatergoryContainer, CatergoryTitle } from "./category.styles.jsx";

const Catergory = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]);

  return (
    <>
      <CatergoryTitle as="h2">{category.toUpperCase()}</CatergoryTitle>
      <CatergoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CatergoryContainer>
    </>
  );
};

export default Catergory;
