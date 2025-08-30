import React, { useState, useEffect } from "react";

const SearchFilter = ({ data = [] }) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim() === "") {
        setFilteredData(data);
      } else {
        setFilteredData(
          data.filter((item) =>
            item.title?.toLowerCase().includes(query.toLowerCase())
          )
        );
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, data]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "250px" }}
      />

      <ul>
        {filteredData?.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchFilter;
