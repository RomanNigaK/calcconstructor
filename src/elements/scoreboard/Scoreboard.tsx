import React, { useContext } from "react";
import styled from "styled-components";

import { CalcCtx } from "../context/CalcContext";

const SBoard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 4px;
  width: 232px;
  height: 52px;
  background: #f3f4f6;
  border-radius: 6px;
  padding-left: 5px;
  padding-right: 5px;
`;
const Numbers = styled.div.attrs((props) => ({}))<{ fs?: string }>`
  height: 44px;
  font-weight: 800;
  font-size: ${({ fs }) => fs};
  line-height: 44px;
  color: #111827;
  flex: none;
  max-width: 222px;
  overflow: hidden;
`;

export default function ScoreboardInput() {
  const { value } = useContext(CalcCtx);

  return (
    <SBoard>
      <Numbers fs={value === "Infinity" || value.length > 10 ? "19px" : "36px"}>
        {value === "Infinity" ? "Не определено" : value}
      </Numbers>
    </SBoard>
  );
}
