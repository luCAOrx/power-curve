import { type Request, type Response } from "express";
import { unlinkSync } from "node:fs";
import { resolve } from "node:path";

import { FileMustBeLessThan200Characters } from "@domain/entities/errors/file-must-be-less-than-200-characters";
import { FileMustBeMoreThan25Characters } from "@domain/entities/errors/file-must-be-more-than-25-characters";
import { FileShouldNotBeEmpty } from "@domain/entities/errors/file-should-not-be-empty";
import { NameMustBeLessThan255Characters } from "@domain/entities/errors/name-must-be-less-than-255-characters";
import { NameMustBeThan5Characters } from "@domain/entities/errors/name-must-be-than-5-characters";
import { NameShouldNotBeEmpty } from "@domain/entities/errors/name-should-not-be-empty";
import { CreatePowerCurveUseCase } from "@domain/use-case/create-power-curve-use-case";
import { PowerCurveAlreadyExists } from "@domain/use-case/errors/power-curve-already-exists";
import { PrismaPowerCurveRepository } from "@infra/repositories/prisma/prisma-power-curve-repository";

export class CreatePowerCurveController {
  async handle(request: Request, response: Response): Promise<void> {
    const { name } = request.body;

    const file = request.file?.filename;

    const prismaPowerCurveRepository = new PrismaPowerCurveRepository();

    const powerCurveUseCase = new CreatePowerCurveUseCase(
      prismaPowerCurveRepository
    );

    await powerCurveUseCase
      .execute({
        name,
        file: String(file),
      })
      .then(({ id, props: { name, file } }) => {
        return response.status(201).json({
          powerCurve: {
            id,
            name,
            file,
          },
        });
      })
      .catch((error: Error) => {
        const localFilePath = resolve(
          __dirname,
          "..",
          "..",
          "..",
          "..",
          `uploads/${String(file)}`
        );

        const testFilePath = resolve(
          __dirname,
          "..",
          "..",
          "..",
          "..",
          `test/uploads/${String(file)}`
        );

        if (file !== undefined) {
          process.env.STORAGE_TYPE === "local"
            ? unlinkSync(localFilePath)
            : unlinkSync(testFilePath);
        }

        if (error instanceof NameShouldNotBeEmpty) {
          return response.status(400).json({
            statusCode: 400,
            message: new NameShouldNotBeEmpty().message,
            error: "Bad request",
          });
        }

        if (error instanceof NameMustBeLessThan255Characters) {
          return response.status(400).json({
            statusCode: 400,
            message: new NameMustBeLessThan255Characters().message,
            error: "Bad request",
          });
        }

        if (error instanceof NameMustBeThan5Characters) {
          return response.status(400).json({
            statusCode: 400,
            message: new NameMustBeThan5Characters().message,
            error: "Bad request",
          });
        }

        if (error instanceof PowerCurveAlreadyExists) {
          return response.status(400).json({
            statusCode: 400,
            message: new PowerCurveAlreadyExists().message,
            error: "Bad request",
          });
        }

        if (error instanceof FileShouldNotBeEmpty) {
          return response.status(400).json({
            statusCode: 400,
            message: new FileShouldNotBeEmpty().message,
            error: "Bad request",
          });
        }

        if (error instanceof FileMustBeLessThan200Characters) {
          return response.status(400).json({
            statusCode: 400,
            message: new FileMustBeLessThan200Characters().message,
            error: "Bad request",
          });
        }

        if (error instanceof FileMustBeMoreThan25Characters) {
          return response.status(400).json({
            statusCode: 400,
            message: new FileMustBeMoreThan25Characters().message,
            error: "Bad request",
          });
        }
      });
  }
}
