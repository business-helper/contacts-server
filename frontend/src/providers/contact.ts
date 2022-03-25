import type { IContact, IAPISuccessResponse } from "types";
import { restAPI } from "./config";

export function getContactsRequest(page: number, limit: number) {
  return restAPI
    .get<IAPISuccessResponse>("/contacts", {
      params: { limit, page },
    })
    .then((res) => res.data.data as IContact[]);
}

export function addContactRequest(data: FormData) {
  return restAPI
    .post<IAPISuccessResponse>("/contacts", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data.data as IContact);
}

export function updateContactRequest(id: number, data: FormData) {
  return restAPI
    .patch<IAPISuccessResponse>(`/contacts/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data.data as IContact);
}

export function deleteContactRequest(id: number) {
  return restAPI
    .delete<IAPISuccessResponse>(`/contacts/${id}`)
    .then((res) => res.data.data as IContact);
}
