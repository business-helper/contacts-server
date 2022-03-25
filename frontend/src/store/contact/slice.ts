import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
  // limit = 50 assumes to loading all contacts on loading.
  ({ page = 1, limit = 50 }: { page?: number; limit?: number }, thunkAPI) => {
    return contactProvider.getContactsRequest(page, limit);
  }
);

export const addContact = createAsyncThunk(
  "/contacts/createContact",
  (contactInfo: FormData, thunkAPI) => {
    return contactProvider.addContactRequest(contactInfo);
  }
);

export const updateContact = createAsyncThunk(
  "/contacts/updateContact",
  ({ id, data }: { id: number; data: FormData }, thunkAPI) =>
    contactProvider.updateContactRequest(id, data)
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  (id: number, thunkAPI) => contactProvider.deleteContactRequest(id)
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    initContacts: (state) => {
      return { list: [], page: 0 };
    },
    increasePage: (state) => {
      state.page++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getContacts.fulfilled, (state, action) => {
      state.list = action.payload;
    });

    builder.addCase(addContact.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });

    builder.addCase(updateContact.fulfilled, (state, action) => {
      state.list = state.list.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
    });

    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.list = state.list.filter(
        (contact) => contact.id !== action.payload.id
      );
    });
  },
});

export const { initContacts, increasePage } = contactSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.contacts;

export default contactSlice.reducer;
