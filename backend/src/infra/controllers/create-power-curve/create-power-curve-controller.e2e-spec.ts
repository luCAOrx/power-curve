import {MakePowerCurve} from '@test/factories/make-power-curve-factory'
import {unlinkSync} from 'node:fs'
import {resolve} from 'node:path'

describe('Create Power Curve Controller', () => {
  it('should be able to create a power curve', async () => {
    const {body, statusCode} = await new MakePowerCurve().toHTTP({})

    const {id, name, file} = body.powerCurve

    const powerCurve = {
      powerCurve: {
        id,
        name,
        file
      }
    }

    const testFilePath = resolve(
      __dirname, '..', '..', '..', '..', `test/uploads/${file}`
    )

    expect(statusCode).toStrictEqual(201)
    expect(body).toStrictEqual(powerCurve)

    unlinkSync(testFilePath)
  })

  it('should not be able to create a power curve with a exist name', async () => {
    const {body, statusCode} = await new MakePowerCurve().toHTTP({})

    expect(statusCode).toStrictEqual(400)
    expect(body).toStrictEqual({
      statusCode: 400,
      message: 'Power curve already exists',
      error: 'Bad request'
    })
  })

  it('should not be able to create a power curve without a name', async () => {
    const {body, statusCode} = await new MakePowerCurve().toHTTP({
      name: '',
    })

    expect(statusCode).toStrictEqual(400)
    expect(body).toStrictEqual({
      statusCode: 400,
      message: 'The field name should not be empty',
      error: 'Bad request'
    })

  })

  it('should not be able to create power curve if name is longer than 255 characters', async () => {
    const {body, statusCode} = await new MakePowerCurve().toHTTP({
      name: 'teste'.repeat(255),
    })

    expect(statusCode).toStrictEqual(400)
    expect(body).toStrictEqual({
      statusCode: 400,
      message: 'The field name must be less than 255 characters',
      error: 'Bad request'
    })
  })

  it('should not be able to create power curve if name is less than 5 characters', async () => {
    const {body, statusCode} = await new MakePowerCurve().toHTTP({
      name: 'test',
    })

    expect(statusCode).toStrictEqual(400)
    expect(body).toStrictEqual({
      statusCode: 400,
      message: 'The field name must be than 5 characters',
      error: 'Bad request'
    })
  })

  it('should not be able to create a power curve without a file', async () => {
    const {body, statusCode} = await new MakePowerCurve().toHTTP({
      name: 'teste-curva-de-potência-04-2017',
      file: ''
    })

    expect(statusCode).toStrictEqual(400)
    expect(body).toStrictEqual({
      statusCode: 400,
      message: 'The field file should not be empty',
      error: 'Bad request'
    })
  })

  it('should not be able to create a power curve if the filename is longer than 200 characters', async () => {
    const testFilePath = resolve(
      __dirname, '..', '..', '..', '..', 'test', 'files', 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.csv'
    )

    const {body, statusCode} = await new MakePowerCurve().toHTTP({
      name: 'teste-curva-de-potência-04-2018',
      file: testFilePath
    })

    expect(statusCode).toStrictEqual(400)
    expect(body).toStrictEqual({
      statusCode: 400,
      message: 'The field file must be less than 200 characters',
      error: 'Bad request'
    })

  })

  it('should not be able to create power curve if filename is less than 25 characters', async () => {
    const testFilePath = resolve(
      __dirname, '..', '..', '..', '..', 'test', 'files', 'e.csv'
    )

    const {body, statusCode} = await new MakePowerCurve().toHTTP({
      name: 'teste-curva-de-potência-04-2018',
      file: testFilePath
    })

    expect(statusCode).toStrictEqual(400)
    expect(body).toStrictEqual({
      statusCode: 400,
      message: 'The file field must be more than 25 characters',
      error: 'Bad request'
    })
  })
})
