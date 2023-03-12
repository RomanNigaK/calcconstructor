import React, { LegacyRef } from "react";

interface IIndicator {
  refI: LegacyRef<HTMLDivElement> | null;
}

export default function Indicator({ refI }: IIndicator) {
  return (
    <div
      style={{ display: "none", position: "absolute", marginLeft: "-6px" }}
      ref={refI}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "stretch",
          alignItems: "center",
        }}
      >
        <div
          style={{
            rotate: "45deg",
            height: "4px",
            width: "4px",
            background: "#5D5FEF",
          }}
        ></div>
        <div
          style={{
            height: "1px",
            width: "240px",
            background: "#5D5FEF",
          }}
        ></div>
        <div
          style={{
            rotate: "45deg",
            height: "4px",
            width: "4px",
            background: "#5D5FEF",
          }}
        ></div>
      </div>
    </div>
  );
}
