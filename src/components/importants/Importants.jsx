import { Card } from "../card/Card";
import "./importants.scss";

export const Importants = ({ newest }) => {
  return (
    <div className="importants">
      {newest?.map((item, index) => (
        <div
          className={index === 0 ? "first" : "other" + index}
          key={"important" + index}
        >
          <Card data={item} />
        </div>
      ))}
    </div>
  );
};
