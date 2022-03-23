import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IContact } from "types";
import type { RootState } from "store";

// Define the initial state using that type
const initialState: IContact[] = [];

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<IContact>) => {
      return [...state, action.payload];
    },
  },
});

export const { addContact } = contactSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.contacts;

export default contactSlice.reducer;
