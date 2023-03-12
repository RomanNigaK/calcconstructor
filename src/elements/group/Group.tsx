import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { useDispatch } from "react-redux";
import { useResultDropElement } from "../../hooks/Elements.hook";
import { useToggle } from "../../hooks/Toggle.hook";
import { deleteElemetFromCollection, sortArray } from "../../redux/appSlice";
import { AppDispatch } from "../../store/store";
import { GroupBox } from "../../styles/styles";
import Runtime from "../runtime/Runtime";

interface IItem {
  name: string;
  index: string;
}

interface IPropsGroupDrag extends PropsWithChildren {
  name: string;
  cheked?: boolean;
  index: number | null;
  refI?: any;
}

export default function Group({
  children,
  name,
  cheked,
  index,
  refI,
}: IPropsGroupDrag) {
  const dispatch = useDispatch<AppDispatch>();
  const { updatestatusElement, isElement } = useResultDropElement(name);
  const [newPosition, setnewPosition] = useState(index);
  const ref = useRef<HTMLDivElement>(null);
  const { runtime } = useToggle();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "GroupBtn",
    item: { name, index },
    end: () => {
      if (refI) refI.current.style.display = "none";
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, dropRef] = useDrop({
    accept: ["GroupBtn"],
    drop: (item: any) => {
      console.log(item);
      if (refI) refI.current.style.display = "none";
      if (item.name !== "Scoreboard" && item.index !== null) {
        dispatch(sortArray({ drag: item.index, newPosition }));
      }
    },

    hover: (item, monitor) => {
      let itemDrag = item as IItem;
      let optionHoveritem = ref.current?.id.split("_");
      let indexDrag = Number(itemDrag.index);
      let indexHover = Number(optionHoveritem![1]);

      if (indexDrag === indexHover) {
        return;
      }
      if (optionHoveritem![1] === "notcheked") {
        return;
      }
      if (item.name === "Scoreboard") {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      let hoverMiddleY;
      if (hoverBoundingRect) {
        hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      }
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect!.top;

      if (hoverClientY && hoverMiddleY) {
        let full = hoverClientY as unknown as number;
        let halffull = hoverMiddleY as unknown as number;

        if (full > halffull) {
          //ниже середины элемента
          if (indexDrag - indexHover > 1 || indexDrag - indexHover <= -1) {
            refI.current.style.top = hoverBoundingRect!.bottom + 5 + "px";
            refI.current.style.left = hoverBoundingRect!.left.toFixed() + "px";
            refI.current.style.display = "block";
          }
          console.log("ниже середины элемента", indexHover);
          setnewPosition(indexHover === 0 ? indexHover + 1 : indexHover);
        }
        if (full < halffull) {
          //выше середины элемента
          if (indexDrag - indexHover >= 1 || indexDrag - indexHover < -1) {
            refI.current.style.top = hoverBoundingRect!.top - 7 + "px";
            refI.current.style.left = hoverBoundingRect!.left.toFixed() + "px";
            refI.current.style.display = "block";
            console.log("выше середины элемента", indexHover);
            setnewPosition(
              indexHover === (0 || 1) ? indexHover : indexHover - 1
            );
          }
        }
      }
    },
  });

  let opacity =
    cheked && !isDragging
      ? 1
      : cheked && isDragging
      ? 0.5
      : !isElement && isDragging
      ? 0.5
      : !isElement
      ? 1
      : 0.5;

  const deletoFromConstructor = (el: string) => {
    if (isElement && cheked) {
      dispatch(deleteElemetFromCollection(el));
    }
  };
  useEffect(() => {
    updatestatusElement(name);
  }, [updatestatusElement, name]);

  drag(dropRef(ref));

  return (
    <>
      {runtime ? (
        <Runtime cheked={cheked}>{children}</Runtime>
      ) : (
        <GroupBox
          ref={!isElement || cheked || name !== "Scoreboard" ? ref : null}
          style={{ opacity }}
          cheked={cheked}
          onDoubleClick={() => deletoFromConstructor(name)}
          id={cheked ? name + "_" + index : name + "_notcheked"}
        >
          {children}
        </GroupBox>
      )}
    </>
  );
}
