import React, { useContext } from "react";

import styled, { css } from "styled-components";

import { useToggle } from "../../hooks/Toggle.hook";

import { CalcCtx } from "../context/CalcContext";
import Arrows from "./Arrows";
import Eye from "./Eye";

const commonstyle = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 36px;
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1px;
  width: 243px;
  height: 38px;
  background: #f3f4f6;
  border-radius: 6px;
  margin-bottom: 40px;
`;
const Runtime = styled.div.attrs<{ isActive: boolean }>((props) => ({
  bg: props.isActive ? "#ffffff" : "none",
  brd: props.isActive ? "1px solid #e2e3e5" : "none",
}))<{ isActive?: boolean; bg?: string; brd?: string }>`
  ${commonstyle}
  width: 108px;
  background: ${({ bg }) => bg};
  border: ${({ brd }) => brd};
`;
const Constructor = styled.div.attrs<{ isActive: boolean }>((props) => ({
  bg: props.isActive ? "#ffffff" : "none",
  brd: props.isActive ? "1px solid #e2e3e5" : "none",
}))<{ isActive?: boolean; bg?: string; brd?: string }>`
  ${commonstyle}
  width: 133px;
  background: ${({ bg }) => bg};
  border: ${({ brd }) => brd};
`;

export default function Toggle() {
  const { runtime, trueRintime, falseRintime } = useToggle();
  const { clear } = useContext(CalcCtx);
  const setModeConstructor = () => {
    falseRintime();
    clear();
  };
  return (
    <Container>
      <Runtime isActive={runtime} onClick={trueRintime}>
        <Eye runtime={runtime} />
        Runtime
      </Runtime>

      <Constructor isActive={!runtime} onClick={setModeConstructor}>
        <Arrows runtime={!runtime} />
        Constructor
      </Constructor>
    </Container>
  );
}
