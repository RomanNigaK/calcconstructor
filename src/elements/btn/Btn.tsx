import React, { useContext } from "react";
import styled from "styled-components";
import { CalcCtx } from "../../elements/context/CalcContext";
import { useToggle } from "../../hooks/Toggle.hook";

const setSizeBtn = (type: string | undefined): string => {
  switch (type) {
    case "box":
      return "70px";
    case "long":
      return "150px";
    case "big":
      return "230px";
    default:
      return "50px";
  }
};

const Button = styled.div.attrs<{ type?: string }>((props) => ({
  type: setSizeBtn(props.type),
  bg: props.type === "big" ? "#5D5FEF" : "inherit",
  color: props.type === "big" ? "#FFFFFF" : "inherit",
  h: props.type === "big" ? "64px" : "46px",
}))<{ type?: string; bg?: string; color?: string; h?: string }>`
  margin: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ type }) => type};
  height: ${({ h }) => h};
  border: 1px solid #e2e3e5;
  border-radius: 6px;
  color: ${({ color }) => color};
  background-color: ${({ bg }) => bg};
`;

const Text = styled.div`
  color: inherit;
`;

interface IPropsBtn {
  type?: "box" | "long" | "big";
  text: string;
}

export default function Btn({ type, text }: IPropsBtn) {
  const { clickBtnNumber, action, clickEqually } = useContext(CalcCtx);
  const { runtime } = useToggle();

  const submit = (btn: string) => {
    if (runtime) {
      if (
        ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ","].includes(btn)
      ) {
        clickBtnNumber(text);
      }
      if (["+", "-", "*", "/"].includes(btn)) {
        action(text);
      }

      if (btn === "=") {
        clickEqually();
      }
    }
  };
  return (
    <>
      <Button type={type} onClick={() => submit(text)}>
        <Text>{text}</Text>
      </Button>
    </>
  );
}
