import { React, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.js";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { setCategories } from "../../store/categories/categories.action.js";

import { ProductsContainer } from "./shop.styles.jsx";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getItems = async () => {
      const categories = await getCategoriesAndDocuments();
      dispatch(setCategories(categories));
    };
    getItems();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
