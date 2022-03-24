export interface IContactBase {
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  age: number;
  avatar?: string;
  linkToWebsite?: string;
  tags: string; // comma-separated string
}

export interface IContact extends IContactBase {
  id: number;
}

export interface IContactMutation extends IContact {
  avatarFile: File;
}

export interface IAPIResponseBase {
  status: boolean;
  message: string;
}

export interface IAPISuccessResponse {
  data: IContact | IContact[];
}

export interface IAPIErrorResponse {
  details: any;
}
