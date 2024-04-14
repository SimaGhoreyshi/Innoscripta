import "./tooltip.scss";

export const Tooltip = ({ text, children }) => {
  return (
    <span className="tooltip">
      {children}
      <span className="tooltip-text">{text}</span>
    </span>
  );
};
