import React, { useEffect, useState } from "react";

import "./filter.scss";

export const Filter = ({ data, setData, combined }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);
  const [originalData] = useState(data);

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    setSelectedCategory("");
    setSelectedSource("");
    // setData(originalData);
  };

  useEffect(() => {
    let filtered = [...originalData];

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }
    if (selectedSource) {
      filtered = filtered.filter((item) => item.source === selectedSource);
    }
    if (startDate && endDate) {
      filtered = filtered.filter(
        (item) =>
          new Date(item.date) >= new Date(startDate) &&
          new Date(item.date) <= new Date(endDate)
      );
    }

    setData(filtered);
  }, [startDate, endDate, selectedCategory, selectedSource, originalData]);

  useEffect(() => {
    const categoriesTemp = combined.reduce((acc, cur) => {
      if (!acc.includes(cur.category)) {
        return [...acc, cur.category];
      }
      return acc;
    }, []);
    setCategories(categoriesTemp);

    const sourcesTemp = combined.reduce((acc, cur) => {
      if (!acc.includes(cur.source)) {
        return [...acc, cur.source];
      }
      return acc;
    }, []);
    setSources(sourcesTemp);
  }, [combined]);

  return (
    <div className="filter">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option value={category} key={index}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={selectedSource}
        onChange={(e) => setSelectedSource(e.target.value)}
      >
        <option value="">All Sources</option>
        {sources.map((source, index) => (
          <option value={source} key={index}>
            {source}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <button onClick={clearFilters}>Clear Filters</button>
    </div>
  );
};
