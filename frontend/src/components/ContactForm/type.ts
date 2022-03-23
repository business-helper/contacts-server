import { IContact } from "types";

export interface IContactForm extends IContact {
  avatarFile?: File;
  strTags?: string;
}
