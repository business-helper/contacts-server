import { Response } from "express";

type ValidationErrorDetails = {
  [key: string]: {
    message: string;
    rule: string;
  };
};

export class ValidationError extends Error {
  details: string[];
  constructor(details: ValidationErrorDetails) {
    super("Validation Failed!");
    this.name = "ValidationError";
    this.details = Object.values(details).map(({ message }) => message);
  }
}

export function __error(
  res: Response,
  error: any,
  statusCode: number = 400
): void {
  res.status(statusCode).json({
    status: false,
    message: error.message,
    details: error.details || [],
  });
}
