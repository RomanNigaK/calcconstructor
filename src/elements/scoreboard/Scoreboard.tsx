import React, { useContext } from "react";
import styled from "styled-components";

import { useToggle } from "../../hooks/Toggle.hook";

import { CalcCtx } from "../context/CalcContext";

const SBoard = styled.div.attrs(() => ({}))<{ cheked?: boolean }>`
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
  cursor: ${({ cheked }) => (cheked ? "no-drop" : "default")};
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

interface IScoreboardInputProps {
  cheked?: boolean;
}

export default function ScoreboardInput({ cheked }: IScoreboardInputProps) {
  const { scoreboardInput, isError } = useContext(CalcCtx);
  const { runtime } = useToggle();

  return (
    <SBoard cheked={cheked && !runtime}>
      <Numbers fs={isError || scoreboardInput.length > 10 ? "19px" : "36px"}>
        {isError ? "Не определено" : scoreboardInput}
      </Numbers>
    </SBoard>
  );
}
