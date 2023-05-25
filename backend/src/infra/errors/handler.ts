import { type Request, type Response } from "express";

const errorHandler = (request: Request, response: Response): Response<any> =>
  response.status(500).json({ message: "Internal server error." });

export default errorHandler;
