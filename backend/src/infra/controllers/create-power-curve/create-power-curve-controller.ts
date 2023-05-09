import {resolve} from "node:path";
import {Request, Response} from "express";
import {unlinkSync} from "node:fs";
import {PrismaPowerCurveRepository} from "@infra/repositories/prisma/prisma-power-curve-repository";
import {CreatePowerCurveUseCase} from "@domain/use-case/create-power-curve-use-case";

export class CreatePowerCurveController {
  async handle(request: Request, response: Response) {
    const {name} = request.body;

    const file = request.file?.filename;

    const prismaPowerCurveRepository = new PrismaPowerCurveRepository()

    const powerCurveUseCase = new CreatePowerCurveUseCase(prismaPowerCurveRepository)

    await powerCurveUseCase.execute({
      name,
      file: String(file)
    }).then(({id, props: {name, file}}) => {
      return response.status(201).json({
        powerCurve: {
          id,
          name,
          file
        }
      });
    }).catch((error: Error) => {
      const localFilePath = resolve(
        __dirname, '..', '..', '..', '..', `uploads/${file}`
      )

      const testFilePath = resolve(
        __dirname, '..', '..', '..', '..', `test/uploads/${file}`
      )

      if (file !== undefined) {
        process.env.STORAGE_TYPE === 'local' ? unlinkSync(localFilePath) : unlinkSync(testFilePath)
      }

      return response.status(400).json({error: error.message})
    })
  }
}
