import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IContact } from "types";
import type { RootState } from "store";
import demoContacts from "data/contacts.json";

// Define the initial state using that type
const initialState: IContact[] = demoContacts;

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<IContact>) => {
      return [...state, action.payload];
    },
    deleteContact: (state, action: PayloadAction<number>) => {
      return state.filter((_, i) => i !== action.payload);
    },
  },
});

export const { addContact, deleteContact } = contactSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.contacts;

export default contactSlice.reducer;
