import React, { useRef } from "react";
import styled from "styled-components";

import Toggle from "./elements/toggle/Toggle";
import { Header, Ico, Title } from "./styles/components";
import GlobalStyles from "./styles/global";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Result from "./elements/result/Result";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import DragElements, {
  Equally,
  Numbers,
  Option,
  Scoreboard,
} from "./elements/dragElements/DragElements";
import { useToggle } from "./hooks/Toggle.hook";
import Indicator from "./elements/indicator/Indicator";
import { useCalc } from "./hooks/Calc.hook";
import { CalcCtx } from "./elements/context/CalcContext";

const Body = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const Elements = styled.div<{ show?: boolean }>`
  margin-right: 26px;
  margin-top: 80px;
  opacity: ${({ show }) => (show ? "1" : "0")};
`;

const ClearResult = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
`;

function App() {
  const collection = useSelector(
    (state: RootState) => state.app.resultCollection
  );

  const { runtime } = useToggle();

  const refI = useRef<HTMLDivElement>(null);
  const {
    clickBtnNumber,
    clickEqually,
    action,
    scoreboardInput,
    isError,
    clear,
  } = useCalc();

  return (
    <Body>
      <Indicator refI={refI} />
      <DndProvider backend={HTML5Backend}>
        <Elements show={!runtime}>
          <Scoreboard />
          <Numbers />
          <Option />
          <Equally />
        </Elements>

        <div style={{ marginLeft: " 26px" }}>
          <CalcCtx.Provider
            value={{
              clickBtnNumber,
              action,
              clickEqually,
              scoreboardInput,
              isError,
              clear,
            }}
          >
            <Toggle />
            <Result refI={refI}>
              {collection.length === 0 ? (
                <ClearResult>
                  <div style={{ textAlign: "center" }}>
                    <Ico />
                    <Header>Перетащите сюда</Header>
                    <Title>
                      любой элемент
                      <br />
                      из левой панели
                    </Title>
                  </div>
                </ClearResult>
              ) : (
                collection.map((i: any, index: number) => {
                  return (
                    <>
                      <DragElements name={i} index={index} refI={refI} />
                    </>
                  );
                })
              )}
            </Result>
          </CalcCtx.Provider>
        </div>
      </DndProvider>
      <GlobalStyles />
    </Body>
  );
}

export default App;
