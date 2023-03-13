/* eslint-disable no-eval */
import { useState } from "react";

export const useCalc = () => {
  const [scoreboardInput, setscoreboardInput] = useState("0");
  const [staticNumber, setstaticNumber] = useState<string | null>(null);
  const [expression, setexpression] = useState<Array<null | string>>([
    null,
    null,
    null,
  ]);

  const [isError, setIsError] = useState<boolean>(false);
  const [lastIsEqually, setlastIsEqually] = useState(false);

  const clickBtnNumber = (btn: string) => {
    let index = !expression[0] || !expression[1] ? 0 : 2;
    let chars = expression[index] ? expression[index]!.split("") : "0";

    if (chars.includes(",") && btn === ",") return;

    let condition = chars === "0" || lastIsEqually;
    if (condition && btn === ",") btn = "0" + btn;
    if (condition && btn === "0" && lastIsEqually) btn = "0,0";
    let copyExpression = [...expression];
    copyExpression[index] = condition ? btn : expression[index] + btn;

    setexpression(copyExpression);
    setscoreboardInput(copyExpression[index]!);
    setstaticNumber(
      index === 2 ? copyExpression[1] + copyExpression[index]! : null
    );
    setIsError(false);
    setlastIsEqually(false);
  };

  const action = (operaition: string) => {
    if (isError) return;

    if (expression[0] && expression[1] && expression[2]) {
      clickEqually(operaition);
      return;
    }

    let copyExpression = [...expression];
    copyExpression[1] = operaition;
    if (!copyExpression[0]) copyExpression[0] = "0";
    setexpression(copyExpression);
    setstaticNumber(null);
    setlastIsEqually(false);
  };

  const clickEqually = (type?: string) => {
    let exp: string;
    if (expression[0] && expression[1] && expression[2]) {
      exp = expression.join("").replaceAll(",", ".");
    }
    if (expression[0] && expression[1]) {
      exp =
        expression[0].replaceAll(",", ".") +
        expression[1] +
        expression[0].replaceAll(",", ".");
    }

    if (expression[0] && staticNumber) {
      exp = expression[0].replace(",", ".") + staticNumber.replace(",", ".");
    }

    if (exp!) {
      let result = eval(exp);
      console.log(result);

      if (!isFinite(result)) {
        setIsError(true);
        setscoreboardInput("Не определено");
        setexpression([null, null, null]);
        return;
      }
      setscoreboardInput(result.toString().replace(".", ","));
      setexpression([
        result.toString().replace(".", ","),
        type ? type : null,
        null,
      ]);
      setlastIsEqually(true);
    }
  };

  const clear = () => {
    setexpression([null, null, null]);
    setscoreboardInput("0");
  };

  return {
    clickBtnNumber,
    action,
    scoreboardInput,
    clickEqually,
    isError,
    clear,
  };
};
