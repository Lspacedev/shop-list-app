import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "lists",
  initialState: {
    lists: [],
  },
  reducers: {
    addList: (state, action) => {},
    updateList: (state, action) => {},
    deleteList: (state, action) => {},
    getList: (state, action) => {},
    addLists: (state, action) => {
      state.lists = action.payload;
    },
    addItem: (state, action) => {},
    updateItem: (state, action) => {},
  },
});

export const { addList, addItem, addLists } = listSlice.actions;
export default listSlice.reducer;
