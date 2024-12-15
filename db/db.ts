import * as SQLite from "expo-sqlite";
import { addLists, addItems } from "@/reducers/listReducer";
import { Action, Dispatch } from "@reduxjs/toolkit";

export const initialiseDb = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("listAppDb", {
      useNewConnection: true,
    });
    await db.execAsync("PRAGMA foreign_keys = ON");

    const init = await db.withTransactionAsync(async () => {
      const res = await db.execAsync(
        `CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY NOT NULL , name TEXT NOT NULL, category TEXT NOT NULL, notes TEXT NOT NULL, timestamp TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY NOT NULL , name TEXT NOT NULL, notes TEXT NOT NULL, timestamp TEXT NOT NULL, quantity REAL NOT NULL, price REAL NOT NULL, listId INTEGER, 
    FOREIGN KEY (listId) REFERENCES lists(id) ON DELETE CASCADE);
      `
      );
      console.log({ res });
    });
  } catch (error) {
    console.log(error);
  }
};

export const insertListData = async (
  name: string,
  category: string,
  notes: string,
  timestamp: string
) => {
  try {
    const db = await SQLite.openDatabaseAsync("listAppDb", {
      useNewConnection: true,
    });

    const res = await db.runAsync(
      "INSERT INTO lists (name, category, notes, timestamp) VALUES (?, ?, ?, ?)",
      [name, category, notes, timestamp]
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const updateList = async (
  name: null | string,
  category: string | null,
  notes: string | null,
  id: number
) => {
  try {
    const db = await SQLite.openDatabaseAsync("listAppDb", {
      useNewConnection: true,
    });

    const res = await db.runAsync(
      "UPDATE lists SET name = coalesce(?, name), category = coalesce(?, category), notes = coalesce(?, notes) WHERE id = ?",
      [name, category, notes, id]
    );
    const result = await db.getAllAsync("SELECT * FROM lists");
  } catch (error) {
    console.log(error);
  }
};
export const readList = async (id: number) => {
  try {
    const db = await SQLite.openDatabaseAsync("listAppDb", {
      useNewConnection: true,
    });

    const res = await db.getAllAsync("SELECT * FROM lists WHERE id = ?", [id]);
  } catch (error) {
    console.log(error);
  }
};
export const readLists = async (dispatch: Dispatch<Action<string>>) => {
  try {
    const db = await SQLite.openDatabaseAsync("listAppDb", {
      useNewConnection: true,
    });

    const res = await db.getAllAsync("SELECT * FROM lists");
    if (res !== null) {
      dispatch(addLists(res));
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteList = async (id: number) => {
  try {
    const db = await SQLite.openDatabaseAsync("listAppDb", {
      useNewConnection: true,
    });
    await db.execAsync("PRAGMA foreign_keys = ON");

    const res = await db.runAsync("DELETE FROM lists WHERE id = ?", [id]);
  } catch (error) {
    console.log(error);
  }
};
export const insertItemData = async (
  name: string,
  notes: string,
  timestamp: string,
  quantity: number,
  price: number,
  listId: number
) => {
  try {
    const db = await SQLite.openDatabaseAsync("listAppDb", {
      useNewConnection: true,
    });

    const res = await db.runAsync(
      "INSERT INTO items (name,  notes, timestamp, quantity, price, listId) VALUES (?, ?, ?, ?, ?, ?)",
      [name, notes, timestamp, quantity, price, listId]
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = async (id: number) => {
  try {
    const db = await SQLite.openDatabaseAsync("listAppDb", {
      useNewConnection: true,
    });

    const res = await db.runAsync("DELETE FROM items WHERE id = ?", [id]);
  } catch (error) {
    console.log(error);
  }
};

export const readItem = async (id: number) => {
  try {
    const db = await SQLite.openDatabaseAsync("listAppDb", {
      useNewConnection: true,
    });

    const res = await db.getAllAsync("SELECT * FROM items WHERE id = ?", [id]);
  } catch (error) {
    console.log(error);
  }
};
export const readItems = async (
  id: number,
  dispatch: Dispatch<Action<string>>
) => {
  try {
    const db = await SQLite.openDatabaseAsync("listAppDb", {
      useNewConnection: true,
    });

    const res = await db.getAllAsync("SELECT * FROM items WHERE listId = ?", [
      id,
    ]);
    if (res !== null) {
      dispatch(addItems(res));
    }
  } catch (error) {
    console.log(error);
  }
};
export const updateItem = async (
  name: null | string,
  notes: string | null,
  quantity: number | null,
  price: number | null,
  id: number
) => {
  try {
    const db = await SQLite.openDatabaseAsync("listAppDb", {
      useNewConnection: true,
    });
    const res = await db.runAsync(
      "UPDATE items SET name = coalesce(?, name), notes = coalesce(?, notes), quantity = coalesce(?, quantity), price = coalesce(?, price) WHERE id = ?",
      [name, notes, quantity, price, id]
    );
  } catch (error) {
    console.log(error);
  }
};
