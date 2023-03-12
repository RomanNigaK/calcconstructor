import { useState } from "react";

export const useCalc = () => {
  const [scoreboardInput, setscoreboardInput] = useState("0");
  const [n1, setn1] = useState<number | null>(null);
  const [isNewNumber, setisNewNumber] = useState(false);
  const [operation, setoperation] = useState<string | null>(null);
  const [block, setblock] = useState(false);
  const [preNumber, setpreNumber] = useState<string | null>(null);

  const result = (type: string) => {
    switch (type) {
      case "+":
        return n1! + parseFloat(scoreboardInput.replace(",", "."));
      case "-":
        return n1! - parseFloat(scoreboardInput.replace(",", "."));
      case "/":
        return n1! / parseFloat(scoreboardInput.replace(",", "."));
      case "*":
        return n1! * parseFloat(scoreboardInput.replace(",", "."));
      default:
        break;
    }
  };
  const resultEqually = (type: string) => {
    switch (type) {
      case "+":
        return n1! + parseFloat(preNumber!);
      case "-":
        return n1! - parseFloat(preNumber!);
      case "/":
        return n1! / parseFloat(preNumber!);
      case "*":
        return n1! * parseFloat(preNumber!);
      default:
        break;
    }
  };

  const clear = () => {
    setscoreboardInput("0");
  };

  const buttonNumber = (number: string) => {
    let chars = scoreboardInput.split("");

    if (chars.includes(",") && number === ",") return;

    let condition =
      (chars[0] === "0" && number !== "," && chars.length === 1) ||
      isNewNumber ||
      scoreboardInput === "Infinity";

    setscoreboardInput(condition ? number : scoreboardInput + number);
    setisNewNumber(false);
    setblock(false);
    setpreNumber(number);
    if (scoreboardInput === "Infinity") {
      setn1(null);
    }
  };

  const action = (type: string) => {
    setoperation(type);
    setisNewNumber(true);
    if (block) return;
    if (n1) {
      setscoreboardInput(result(operation!)!.toString());
      setn1(result(operation!)!);
      setblock(true);
    } else {
      setn1(parseFloat(scoreboardInput.replace(",", ".")));
    }
  };

  const equally = () => {
    setscoreboardInput(resultEqually(operation!)!.toString());

    setn1(resultEqually(operation!)!);
    setblock(true);
  };

  return { buttonNumber, action, value: scoreboardInput, clear, equally };
};
