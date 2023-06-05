import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const [productInfo, setProductInfo] = useState([]);

  const updateSearchValue = (value) => {
    setSearchValue(value);
  };

  return (
    <SearchContext.Provider value={{ searchValue, productInfo, setProductInfo, updateSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};
