export type Config = {
  port: number;
};

export interface IContact {
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  age: number;
  avatar?: string;
  avatarFile?: File;
  linkToWebsite: string;
  tags: string[];
}
