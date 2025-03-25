import React from "react";
import { Badge } from "./Badge";

/**
 * TCell is a component that renders a table cell.
 * It receives a `text` property that is the content of the cell.
 * If `isBadge` is true, it will render a `Badge` component with the `badgeType` property.
 * Otherwise, it will render a plain text cell.
 * @param {Object} props - Component props.
 * @param {string} props.text - The text to be displayed in the cell.
 * @param {boolean} props.isBadge - Whether the cell should be rendered as a badge.
 * @param {string} props.badgeType - The type of badge to be rendered.
 * @returns {ReactElement} A JSX element representing the table cell.
 */
export const TCell = ({ text, isBadge, badgeType }) => {
  return (
    <td>
      {isBadge ? <Badge type={badgeType}>{text}</Badge> : text}
    </td>
  );
};