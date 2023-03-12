import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useResultDropElement = (currentElement?: string) => {
  const [listElements, setlistElements] = useState([
    "Scoreboard",
    "Numbers",
    "Option",
    "Equally",
  ]);

  const [isElement, setisElement] = useState(false);
  const collection = useSelector(
    (state: RootState) => state.app.resultCollection
  );

  const updatestatusElement = (el: string) => {
    setisElement(collection.includes(el) ? true : false);
  };

  const filterElement = () => {
    let arr: string[] = [];
    if (currentElement) {
      //console.log(currentElement);
      collection.forEach((el) => {
        if (el !== currentElement) {
          arr.push(el);
        }
      });
      //console.log(arr);
      return listElements;
    }
    return collection;
  };

  const quantityChekElement = collection.length;

  return { filterElement, updatestatusElement, isElement, quantityChekElement };
};
