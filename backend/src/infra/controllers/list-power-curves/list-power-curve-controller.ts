import {Request, Response} from "express";
import {resolve} from 'node:path'
import {readFileSync} from 'node:fs'
import {ListPowerCurvesUseCase} from "@domain/use-case/list-power-curves-use-case";
import {PrismaPowerCurveRepository} from "@infra/repositories/prisma/prisma-power-curve-repository";

export class ListPowerCurvesController {
  async handle(request: Request, response: Response) {
    const {page, takePage} = request.query

    const prismaPowerCurveRepository = new PrismaPowerCurveRepository()

    const listPowerCurvesUseCase = new ListPowerCurvesUseCase(prismaPowerCurveRepository)

    await listPowerCurvesUseCase.execute({
      page: Number(page),
      takePage: Number(takePage)
    }).then(data => {
      const powerCurveOrPowerCurves = data.map(powerCurve => {
        const {
          id,
          props: {
            name,
            file
          },
          created_at
        } = powerCurve

        if (process.env.STORAGE_TYPE === 'local') {
          const localFilePath = resolve(__dirname, '..', '..', '..', '..', `uploads/${file}`)
          const localFileData = readFileSync(localFilePath)

          if (file === localFilePath) {
            return {
              id,
              name,
              file: localFileData,
              created_at
            }
          }
        }

        if (process.env.STORAGE_TYPE === 'test') {
          const testFilePath = resolve(__dirname, '..', '..', '..', '..', `test/uploads/${file}`)
          const testFileData = readFileSync(testFilePath)

          if (file === testFilePath) {
            return {
              id,
              name,
              file: testFileData,
              created_at
            }
          }
        }
      })

      return response.status(200).json(powerCurveOrPowerCurves)
    }).catch((error: Error) => {
      return response.status(400).json({
        error: error.message
      })
    })
  }
}
