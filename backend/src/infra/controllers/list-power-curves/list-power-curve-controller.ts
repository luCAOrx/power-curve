import {Request, Response} from "express";
import {resolve} from 'node:path'
import {readFileSync} from 'node:fs'
import {ListPowerCurvesUseCase} from "@domain/use-case/list-power-curves-use-case";
import {PrismaPowerCurveRepository} from "@infra/repositories/prisma/prisma-power-curve-repository";
import {QueryParamsShouldNotBeEmpty} from "@infra/errors/query-params-should-not-be-empty";

export class ListPowerCurvesController {
  async handle(request: Request, response: Response) {
    const {page, takePage} = request.query

    if (!page || !takePage) {
      return response.status(400).json({
        statusCode: 400,
        message: new QueryParamsShouldNotBeEmpty().message,
        error: 'Bad request'
      })
    }

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

          return {
            id,
            name,
            file: localFileData,
            created_at
          }
        }

        if (process.env.STORAGE_TYPE === 'test') {
          const testFilePath = resolve(__dirname, '..', '..', '..', '..', `test/uploads/${file}`)
          const testFileData = readFileSync(testFilePath)

          return {
            id,
            name,
            file: testFileData,
            created_at
          }
        }
      })

      return response.status(200).json(powerCurveOrPowerCurves)
    }).catch(() => {
      return response.status(400).json({
        statusCode: 400,
        message: 'Error listing power curve',
        error: 'Bad request'
      })
    })
  }
}
