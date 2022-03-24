import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { IContact } from "types";
import type { RootState } from "store";
import * as contactProvider from "providers/contact";

// Define the initial state using that type
interface IContactState {
  list: IContact[];
  page: number;
}
const initialState: IContactState = {
  list: [],
  page: 0,
};

export const getContacts = createAsyncThunk(
  "/contacts/getContacts",
  async ({ page, limit = 10 }: { page: number; limit?: number }, thunkAPI) => {
    const response = await contactProvider.getContactsRequest(page, limit);
    return response.data;
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<IContact>) => {
      state.list.push(action.payload);
    },
    deleteContact: (state, action: PayloadAction<number>) => {
      state.list.filter((_, i) => i !== action.payload);
    },
    initContacts: (state) => {
      return { list: [], page: 0 };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getContacts.fulfilled, (state, action) => {
      console.log("[extraReducer]", action.payload);
      state.list = state.list.concat(action.payload);
    });
  },
});

export const { addContact, deleteContact, initContacts } = contactSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.contacts;

export default contactSlice.reducer;
