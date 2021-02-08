import React, { useEffect, useState, createContext } from "react";

const CategoriesContext = createContext();
import categoriesApi from "../../api/categories";

export const CategoriesContextProvider = ({ children }) => {
  let { data: categories, error, loading, request: loadCategories } = useApi(
    categoriesApi.get
  );

  useEffect(() => {
    loadCategories();
  }, []);

  const getCategory = (id) =>
    categories.find((category) => category._id === id);

  categories = categories.sort((a, b) => (a.name < b.name ? -1 : 1));

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        loadCategories,
        getCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesContext;
