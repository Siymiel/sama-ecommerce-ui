import { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  return (
    <ProductContext.Provider value={{ filteredProducts, setFilteredProducts }}>
      {children}
    </ProductContext.Provider>
  );
};