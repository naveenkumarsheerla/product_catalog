import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../SearchContext";
import "../components/Search.css";

export const Search = () => {
  const { updateSearchValue, setProductInfo } = useContext(SearchContext);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();


  const handleSearchChange = async (e) => {
    // e.preventDefault(); 
    const value = e.target.value;
    setSearchValue(value);

    try {
      const response = await fetch(
        `https://2zii0x3fsl.execute-api.ap-south-1.amazonaws.com/dev/products?query=${value}`
      );
      const data = await response.json();
      setProductInfo(data);
      updateSearchValue(value);
    //   console.log(data);
      navigate("/searchresult");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="search">
        <i className="fa fa-search"></i>
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};
