import React, { PropsWithChildren, useCallback, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";
import { addResultCollection } from "../../redux/appSlice";
import { RootState, AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { useResultDropElement } from "../../hooks/Elements.hook";

const ResultBox = styled.div.attrs<{ clear?: boolean }>((props) => ({
  border: props.clear ? "2px dashed #c4c4c4" : "2px dashed #FFF",
  style: {},
}))<{ bg?: string; border?: string; clear?: boolean }>`
  width: 243px;
  height: 480px;
  border: ${({ border }) => border};
  border-radius: 6px;
  background-color: ${({ bg }) => bg};
`;

interface IResultProps extends PropsWithChildren {
  refI: any;
}

export default function Result({ children, refI }: IResultProps) {
  const { quantityChekElement } = useResultDropElement();
  const dispatch = useDispatch<AppDispatch>();
  const ref = useRef<HTMLDivElement>(null);

  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: ["Scoreboard", "Numbers", "Option", "Equally", "GroupBtn"],
    drop: (item) => {
      dispatch(addResultCollection(item));
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    hover: (item, monitor) => {},
  });

  dropRef(ref);

  return (
    <ResultBox
      ref={ref}
      bg={isOver && !quantityChekElement ? "#F0F9FF" : "inherit"}
      clear={!quantityChekElement ? true : false}
    >
      {children}
    </ResultBox>
  );
}
