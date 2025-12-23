import React, { useState, useEffect } from "react";
import useDebouncedSearch from "./useDebouncedSearch";
import { useNavigate } from "react-router-dom";

function SearchProduct() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debouncedQuery = useDebouncedSearch(query);
  const navigate = useNavigate();

  const handleNavigate = (item)=>{
    setQuery('')
    navigate(`/product/${item.title}`,{state : item})
    setSuggestions([])
  }

  useEffect(() => {
    if (!debouncedQuery) return;

    async function loadSuggestions() {
      const results = await fetchProductSuggestions(debouncedQuery);
      setSuggestions(results);
    }

    loadSuggestions();
  }, [debouncedQuery]);

  async function fetchProductSuggestions(query) {
    try {
      const [dummyRes, fakeStoreRes, platziRes] = await Promise.all([
        fetch(`https://dummyjson.com/products/search?q=${query}`),
        fetch(`https://fakestoreapi.com/products`), // no search, filter manually
        fetch(`https://api.escuelajs.co/api/v1/products?title=${query}`),
      ]);

      const [dummyData, fakeData, platziData] = await Promise.all([
        dummyRes.json(),
        fakeStoreRes.json(),
        platziRes.json(),
      ]);

      // Filter and combine results
      const fakeFiltered = fakeData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );

      const allResults = [
        ...(dummyData.products || []),
        ...fakeFiltered,
        ...platziData,
      ];

      // Limit to first 10 suggestions
      return allResults.slice(0, 10);
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }
    const filtered = products.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
  }

    return (
      <>
        {/* <form action="">
        <input
          type="text"
          placeholder="Search for products or more"
          className="p-2 w-96 focus:outline-none "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form> */}
        {/* <div>
        <ul className="bg-red-500 shadow rounded mt-2">
          {suggestions.map((item, i) => (
            <li key={i} className="p-2 hover:bg-gray-100">
              {item.title}
            </li>
          ))}
        </ul>
      </div> */}
        {/* {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w- bg-white border border-gray-200 rounded-md shadow-md mt-1 z-10">
          {suggestions.map((item, i) => (
            <li key={i} className="p-2 hover:bg-gray-100 cursor-pointer">
              {item.title}
            </li>
          ))}
        </ul>
      )} */}

        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search for products or more"
            className="p-2 w-full focus:outline-none bg-transparent"
            value={query}
            onChange={handleSearch}
          />

          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-md mt-1 z-10">
              {suggestions.map((item, i) => (
                <li key={i} className="p-2 hover:bg-gray-100 cursor-pointer hover:text-orange-500" onClick={()=>handleNavigate(item)} >
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </>
    );
  };


export default SearchProduct;
