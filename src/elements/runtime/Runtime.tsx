import React, { PropsWithChildren } from "react";
import { GroupBox } from "../../styles/styles";

interface IPropsRuntime extends PropsWithChildren {
  cheked?: boolean;
}
export default function Runtime({ children, cheked }: IPropsRuntime) {
  return <GroupBox cheked={cheked}>{children}</GroupBox>;
}
