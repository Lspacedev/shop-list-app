import { createSlice } from "@reduxjs/toolkit";
type ListType = {
  id: number;
  name: string;
  category: string;
  notes: string;
  timestamp: string;
};
type ItemType = {
  id: number;
  name: string;
  category: string;
  notes: string;
  quantity: number;
  timestamp: string;
  price: number;
};
type ListState = {
  lists: ListType[];
  items: ItemType[];
};
const initialState: ListState = {
  lists: [],
  items: [],
};
const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addToList: (state, action) => {
      state.lists.push(action.payload);
    },
    updateList: (state, action) => {},
    deleteList: (state, action) => {},
    getList: (state, action) => {},
    addLists: (state, action) => {
      state.lists = action.payload;
    },
    addItem: (state, action) => {},
    updateItem: (state, action) => {},
    addItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addToList, addItem, addLists, addItems } = listSlice.actions;
export default listSlice.reducer;
