import React from "react";
interface IArrowProps {
  runtime: boolean;
}
export default function Arrows({ runtime }: IArrowProps) {
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.50008 8.33337L1.16675 5.00004L4.50008 1.66671M9.50008 1.66671L12.8334 5.00004L9.50008 8.33337"
        stroke={runtime ? "#5D5FEF" : "#4D5562"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
