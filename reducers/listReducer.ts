import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "lists",
  initialState: {
    loading: true,
    lists: [],
    items: [],
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
    addItems: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addList, addItem, addLists, addItems, setLoading } =
  listSlice.actions;
export default listSlice.reducer;
