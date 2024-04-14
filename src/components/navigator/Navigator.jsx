import { useState } from "react";

import "./navigator.scss";
import { Searchbox } from "../";

export const Navigator = ({ data, setData, combined }) => {
  const [selectedNav, setSelectedNav] = useState("feed");
  const [originalData, setOriginalData] = useState(data);

  const handleNavigation = (nav) => {
    setSelectedNav(nav);
    switch (nav) {
      case "feed":
        setData(combined);
        setOriginalData(combined);
        break;
      default:
        const favorites = localStorage.getItem(nav)?.split(",");
        const dataTemp = combined.filter((data) => {
          const seperated = String(data[nav]).split(",");
          return favorites?.some((fav) => seperated.includes(fav));
        });
        setData(dataTemp);
        break;
    }
  };

  return (
    <div className="nav">
      <ul className="navigator">
        <li
          className={"nav-feed" + (selectedNav === "feed" ? " selected" : "")}
          onClick={() => handleNavigation("feed")}
        >
          <p>feed</p>
        </li>
        <li
          className={
            "nav-fav-authors" + (selectedNav === "author" ? " selected" : "")
          }
          onClick={() => handleNavigation("author")}
        >
          <p>favorite authors</p>
        </li>
        <li
          className={
            "nav-fav-categories" +
            (selectedNav === "category" ? " selected" : "")
          }
          onClick={() => handleNavigation("category")}
        >
          <p>favorite categories</p>
        </li>
        <li
          className={
            "nav-fav-sources" + (selectedNav === "source" ? " selected" : "")
          }
          onClick={() => handleNavigation("source")}
        >
          <p>favorite sources</p>
        </li>
      </ul>
      <Searchbox data={data} setData={setData} originalData={originalData} />
    </div>
  );
};
