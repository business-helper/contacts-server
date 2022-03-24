import type {
  IContact,
  IContactMutation,
  IAPISuccessRespose,
  IAPIErrorResponse,
} from "types";
import { restAPI } from "./config";

export function getContactsRequest(page: number, limit: number): Promise<any> {
  return restAPI
    .get<IAPISuccessRespose>("/contacts", {
      params: { limit, page },
    })
    .then((res) => res.data.data as IContact[]);
}

export function addContactRequest(data: FormData) {
  return restAPI
    .post<IAPISuccessRespose>("/contacts", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data.data as IContact);
}
