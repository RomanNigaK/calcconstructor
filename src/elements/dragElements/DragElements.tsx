import React, { LegacyRef, useContext } from "react";

import Btn from "../btn/Btn";
import { CalcCtx } from "../context/CalcContext";
import Group from "../group/Group";
import ScoreboardInput from "../scoreboard/Scoreboard";

interface IPropsEl {
  cheked?: boolean;
  index?: number | null;
  refI?: LegacyRef<HTMLDivElement> | null;
}

export const Numbers = ({ cheked, index = null, refI }: IPropsEl) => {
  return (
    <Group name="Numbers" cheked={cheked} index={index} refI={refI}>
      <Btn text="9" type="box" />
      <Btn text="8" type="box" />
      <Btn text="7" type="box" />
      <Btn text="6" type="box" />
      <Btn text="5" type="box" />
      <Btn text="4" type="box" />
      <Btn text="3" type="box" />
      <Btn text="2" type="box" />
      <Btn text="1" type="box" />
      <Btn text="0" type="long" />
      <Btn text="," type="box" />
    </Group>
  );
};

export const Scoreboard = ({ cheked, index = null, refI }: IPropsEl) => {
  return (
    <Group name="Scoreboard" cheked={cheked} index={index} refI={refI}>
      <ScoreboardInput />
    </Group>
  );
};

export const Option = ({ cheked, index = null, refI }: IPropsEl) => {
  return (
    <Group name="Option" cheked={cheked} index={index} refI={refI}>
      <Btn text="/" />
      <Btn text="*" />
      <Btn text="-" />
      <Btn text="+" />
    </Group>
  );
};
export const Equally = ({ cheked, index = null, refI }: IPropsEl) => {
  return (
    <Group name="Equally" cheked={cheked} index={index} refI={refI}>
      <Btn text="=" type="big" />
    </Group>
  );
};

interface IPropsDragElements {
  name: string;
  index: number | null;
  refI: any;
}

export default function DragElements({
  name,
  index = null,
  refI,
}: IPropsDragElements) {
  switch (name) {
    case "Numbers":
      return <Numbers cheked={true} index={index} refI={refI} />;
    case "Scoreboard":
      return <Scoreboard cheked={true} index={index} refI={refI} />;
    case "Option":
      return <Option cheked={true} index={index} refI={refI} />;
    case "Equally":
      return <Equally cheked={true} index={index} refI={refI} />;
  }
  return <></>;
}
