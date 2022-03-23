import express, { Request, Response } from "express";
import { Validator } from "node-input-validator";

import { ValidationError, __error } from "../utils";

const router = express.Router();

router.route("/ping").get((req: Request, res: Response) => {
  res.status(200).send("Hi from server");
  // const validator = new Validator(req.query, {
  //   sentence: "required|string|minLength:2",
  // });
  // return validator
  //   .check()
  //   .then((matched) => {
  //     if (!matched) throw new ValidationError(validator.errors);
  //     return reverseWords(req.query.sentence as string);
  //   })
  //   .then((reversed) => res.status(200).json(reversed))
  //   .catch((error) => __error(res, error));
});

export default router;
