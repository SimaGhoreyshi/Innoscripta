import { useEffect, useState } from "react";

import "./searchbox.scss";

export const Searchbox = ({ data, setData, originalData }) => {
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    if (searchKey === "") {
      setData(originalData);
    } else {
      const foundData = data.filter((item) =>
        String(item.title).toLowerCase().includes(searchKey.toLowerCase())
      );
      setData(foundData);
    }
  }, [searchKey]);

  return (
    <div className="searchbox">
      <input
        placeholder="Search the news"
        className="searchbox-input"
        defaultValue={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      {/* <button className="searchbox-button" onClick={handleSearch}>
        <img src={searchIcon} alt="search button" />
      </button> */}
    </div>
  );
};
