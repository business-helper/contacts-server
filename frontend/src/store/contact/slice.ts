import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { IContact, IContactMutation } from "types";
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
    return contactProvider.getContactsRequest(page, limit);
  }
);

export const addContact = createAsyncThunk(
  "/contacts/createContact",
  async (contactInfo: FormData, thunkAPI) => {
    return contactProvider.addContactRequest(contactInfo);
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    // addContact: (state, action: PayloadAction<IContact>) => {
    //   state.list.push(action.payload);
    // },
    deleteContact: (state, action: PayloadAction<number>) => {
      state.list.filter((_, i) => i !== action.payload);
    },
    initContacts: (state) => {
      return { list: [], page: 0 };
    },
    increasePage: (state) => {
      state.page++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getContacts.fulfilled, (state, action) => {
      state.list = state.list.concat(action.payload);
    });

    builder.addCase(addContact.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });
  },
});

export const { deleteContact, initContacts, increasePage } =
  contactSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.contacts;

export default contactSlice.reducer;
