import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../SearchContext";
import { Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../components/SearchResult.css";

export const SearchResult = () => {
    const { searchValue } = useContext(SearchContext);
    const [searchResults, setSearchResults] = useState([]);
    const [sortOption, setSortOption] = useState("high");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedPriceRange, setSelectedPriceRange] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    console.log(searchValue)

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await fetch(`https://2zii0x3fsl.execute-api.ap-south-1.amazonaws.com/dev/products?query=${searchValue}`);
                const data = await response.json();
                setSearchResults(data);

                setFilteredResults(data);
            } catch (error) {
                console.log(error);
            }

        };

        fetchData();
    }, [searchValue]);

    useEffect(() => {
        let tempFilteredResults = [...searchResults];

        // Filter by brand
        if (selectedBrand !== "") {
            tempFilteredResults = tempFilteredResults.filter((item) =>
                item.name.toLowerCase().includes(selectedBrand.toLowerCase())
            );
        }

        // Filter by price range
        if (selectedPriceRange !== "") {
            const [minPrice, maxPrice] = selectedPriceRange.split("-");
            tempFilteredResults = tempFilteredResults.filter(
                (item) => item.price >= minPrice && item.price <= maxPrice
            );
        }

        // Apply sorting
        if (sortOption === "high") {
            tempFilteredResults.sort((a, b) => a.price - b.price);
        } else if (sortOption === "low") {
            tempFilteredResults.sort((a, b) => b.price - a.price);
        }

        setFilteredResults(tempFilteredResults);
    }, [sortOption, selectedBrand, selectedPriceRange, searchResults]);

    const handleSortChange = (e) => {
        setSortOption(e.target.value);

        // Reset the selected brand and price range
        setSelectedBrand("");
        setSelectedPriceRange("");
    };

    const handleBrandFilter = (brandName) => {
        setSelectedBrand(brandName);
    };

    const handlePriceFilter = (priceRange) => {
        setSelectedPriceRange(priceRange);
    };

    const handleFilterButtonClick = () => {
        setShowFilters(!showFilters);
    };

    return (
        <>
            <div className="d-flex justify-content-between">

                <div className="filter-button-container">
                    <button onClick={handleFilterButtonClick} className="filter-button">Filter &nbsp;{showFilters ? <span>&or;</span> : <span>&and;</span>}</button>
                </div>
                <div className="sort-options">
                    Sort by:
                    <select value={sortOption} onChange={handleSortChange} className="selectbox">
                        <option value="high">Price: Low to High</option>
                        <option value="low">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <div className="filter-container">
                {showFilters && (
                    <div className="filter-options">
                        <div className="dropdown">
                            <span>
                                Brand {selectedBrand !== "" && <span>- {selectedBrand}</span>}
                            </span>
                            <div>
                                <ul className="dropdown-menu">
                                    <li>
                                        {/* <a href="#">Select Brands</a> */}
                                        {selectedBrand === "" && (
                                            <ul >
                                                {[...new Set(searchResults.map((item) => item.name))].map((brandName) => (
                                                    <li key={brandName} onClick={() => handleBrandFilter(brandName)}>
                                                        <a href="#">{brandName}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                    {selectedBrand !== "" && (
                                        <li>
                                            <a href="#">{selectedBrand}</a>
                                            <ul className="sub-dropdown-menu">
                                                <li onClick={() => handleBrandFilter("")}>
                                                    <a href="#">All</a>
                                                </li>
                                            </ul>
                                        </li>
                                    )}


                                </ul>
                            </div>
                        </div>

                        <div className="price-filter">
                            <span>Price:</span>
                            <select
                                value={selectedPriceRange}
                                onChange={(e) => handlePriceFilter(e.target.value)}
                            >
                                <option value="">All</option>
                                <option value="0-100">0 - 100</option>
                                <option value="100-500">100 - 500</option>
                                <option value="500-5000">500 - 5000</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {filteredResults.length > 0 ? (
                <Row xs={1} sm={1} md={1} lg={1} xl={1} className="g-3 m-2  container-fluid">
                    {filteredResults.map((item) => (
                        <Col key={item.id}>
                            <Link to={`${item.id}`} style={{ textDecoration: "none", color: "#202124" }}>
                                <div className="card mb-3">
                                    <div className="card-content">
                                        <div className="card-content-div">
                                            <img src={item.image[0]} alt="" className="card-img" />
                                        </div>
                                        <div className="col-md-10">
                                            <div className="card-body">
                                                <h5 className="card-title" style={{ fontSize: "15px" }}>{item.name}</h5>
                                                <p className="card-text">
                                                    <small className="text-muted">{item.description}</small>
                                                </p>
                                                <p className="card-text">
                                                    <small>Price -<b> &#x20B9;{item.price}</b></small>
                                                </p>
                                                <span className="fa fa-star checked" style={{ color: "#ffc107" }}></span>
                                                <span className="fa fa-star checked" style={{ color: "#ffc107" }}></span>
                                                <span className="fa fa-star checked" style={{ color: "#ffc107" }}></span>
                                                <span className="fa fa-star checked" style={{ color: "#ffc107" }}></span>
                                                <span className="fa fa-star "></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                    ))}
                </Row>
            ) : (
                <div>Loading ...</div>
            )}
        </>
    );
};



