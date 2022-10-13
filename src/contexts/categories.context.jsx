import { createContext, useState, useEffect } from "react";

//import SHOP_DATA from "../utils/shop-data.js";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategories] = useState({});
  const value = {
    categoriesMap,
  };

  useEffect(() => {
    const getItems = async () => {
      const categoriesMap = await getCategoriesAndDocuments();
      setCategories(categoriesMap);
    };
    getItems();
  }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
