import type { IContact } from "types";
import { restAPI } from "./config";

export function getContactsRequest(page: number, limit: number): Promise<any> {
  return restAPI
    .get("/contacts", {
      params: { limit, page },
    })
    .then((res) => res.data);
}
export const DEMO = "test";
