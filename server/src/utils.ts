import { Request, Response } from "express";
import fs from "fs";

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

export function readFile(src: string) {
  return new Promise<Buffer>((resolve, reject) => {
    fs.readFile(src, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

export function writeFile(dest: string, data: Buffer) {
  return new Promise<string>((resolve, reject) => {
    fs.writeFile(dest, data, (err) => {
      err ? reject(err) : resolve(dest);
    });
  });
}
