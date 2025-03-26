import React, { memo } from "react";
import { THeaderCell } from "../atoms/THeaderCell";

export const THeaderRow = memo(({ headerData }) => {
  // Validate headerData to prevent errors
  if (!headerData || !Array.isArray(headerData)) {
    console.error('Invalid headerData');
    return null;
  }

  return (
    <thead>
      <tr>
        {headerData.map((header, index) => (
          <THeaderCell 
            key={header.label || index} 
            label={header.label}
            onClick={header.click}
            data={header.label}
            clase={header.clase}
          />
        ))}
      </tr>
    </thead>
  );
});

THeaderRow.displayName = 'THeaderRow';