import { createSlice } from "@reduxjs/toolkit";

interface IState {
  runtime: boolean;
  resultCollection: string[];
}

const initialState: IState = {
  runtime: false,
  resultCollection: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setRuntime: (state, action) => {
      state.runtime = action.payload;
    },
    addResultCollection: (state, action) => {
      if (!state.resultCollection.includes(action.payload.name)) {
        if (action.payload.name === "Scoreboard") {
          state.resultCollection.unshift(action.payload.name);
        } else {
          state.resultCollection.push(action.payload.name);
        }
      }
    },
    deleteElemetFromCollection: (state, action) => {
      let arr: string[] = [];
      state.resultCollection.forEach((i) => {
        if (action.payload !== i) arr.push(i);
      });
      state.resultCollection = arr;
    },
    sortArray: (state, action) => {
      console.log(action.payload);
      let dragIndex = action.payload.drag;
      let newPosition = action.payload.newPosition;
      if (newPosition === 0) return;
      let arr = [...state.resultCollection];
      var removed = arr.splice(dragIndex, 1)[0];
      console.log("arr", arr.length);
      let newArr: string[] = [];
      arr.forEach((element, index) => {
        console.log(index);
        if (index === newPosition) {
          newArr.push(removed);
        }
        newArr.push(element);
      });
      state.resultCollection = newArr;
    },
  },
});

export const {
  setRuntime,
  addResultCollection,
  deleteElemetFromCollection,
  sortArray,
} = appSlice.actions;

export default appSlice.reducer;
