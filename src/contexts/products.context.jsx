import { createContext, useState, useEffect } from "react";

import SHOP_DATA from "../utils/shop-data.json";

export const ProductsContext = createContext({
  //SHOP_DATA,
  //setCurrentProducts: () => null,
});

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState(SHOP_DATA);
  const value = {
    products,
    setProducts,
  };

  useEffect(() => {}, []);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
