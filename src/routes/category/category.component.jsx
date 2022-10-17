import { React, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { selectCategoriesMap } from "../../store/categories/categories.selector.js";

import ProductCard from "../../components/product-card/product-card.component";

import { CatergoryContainer, CatergoryTitle } from "./category.styles.jsx";

const Catergory = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
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
