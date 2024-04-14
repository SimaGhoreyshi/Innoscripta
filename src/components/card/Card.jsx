import "./card.scss";
import newsBg from "../../assets/news-bg.jpg";
import { Tooltip } from "../tooltip/Tooltip";

export const Card = ({ data }) => {
  const background = data.image || newsBg;

  const toggleFavorites = (value, field) => {
    const favoritesInField = localStorage.getItem(`${field}`)?.split(",") || [];

    if (favoritesInField?.includes(value)) {
      localStorage.setItem(
        `${field}`,
        favoritesInField
          .filter((item) => item !== value && item.length > 0)
          .join(",")
      );
    } else {
      favoritesInField.push(value);
      localStorage.setItem(`${field}`, favoritesInField.join(","));
    }
  };

  return (
    <div
      className="card-container"
      style={{ backgroundImage: `url(${background})` }}
    >
      <p
        className="card-category"
        onClick={(e) => {
          toggleFavorites(data.category, "category");
        }}
      >
        <Tooltip text={"add to favorite categories"}>#{data.category}</Tooltip>
      </p>
      <p
        className="card-source"
        onClick={(e) => {
          toggleFavorites(data.source, "source");
        }}
      >
        <Tooltip text={"add to favorite sources"}>{data.source}</Tooltip>
      </p>

      <a href={data.url} target="_blank" className="card-url">
        <p className="card-title">{data.title}</p>
      </a>
      <div className="card-authors">
        {String(data.author)
          ?.split(",")
          .map((author, authorIndex) => (
            <button
              className="author-name"
              onClick={(e) => toggleFavorites(author, "author")}
              key={"author" + authorIndex}
            >
              <Tooltip text={"add to favorite authors"}>{author}</Tooltip>
            </button>
          ))}
      </div>
    </div>
  );
};
