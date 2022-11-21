import { React, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.js";
import { CATEGORIES_ACTION_TYPES } from "../../store/categories/categories.type";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { fetchCategoriesStart } from "../../store/categories/categories.action.js";

import { ProductsContainer } from "./shop.styles.jsx";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("running async");
    dispatch(fetchCategoriesStart());
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
