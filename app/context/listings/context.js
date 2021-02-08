import React, { createContext, useEffect } from "react";
import listingsApi from "../../api/listings";

const ListingsContext = createContext();

export const ListingsContextProvider = ({ children }) => {
  const { data: listings, error, loading, request: loadListings } = useApi(
    listingsApi.getListings
  );

  useEffect(() => {
    loadListings();
  }, []);

  return (
    <ListingsContext.Provider
      value={{
        error,
        listings,
        loadListings,
        loading,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
};

export default ListingsContext;
