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
  list: ListType;
  item: ItemType;
};
const initialState: ListState = {
  lists: [],
  items: [],
  list: { id: 0, name: "", category: "", notes: "", timestamp: "" },
  item: {
    id: 0,
    name: "",
    category: "",
    notes: "",
    quantity: 0,
    timestamp: "",
    price: 0,
  },
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
    addList: (state, action) => {
      state.list = action.payload;
    },
    addItem: (state, action) => {
      state.item = action.payload;
    },
    updateItem: (state, action) => {},
    addItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addToList, addItem, addLists, addItems, addList } =
  listSlice.actions;
export default listSlice.reducer;
