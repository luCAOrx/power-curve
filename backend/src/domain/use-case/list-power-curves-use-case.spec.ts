import {PowerCurve} from "@domain/entities/power-curve"
import {MakePowerCurve} from "@test/factories/make-power-curve-factory"
import {InMemoryPowerCurveRepository} from "@test/in-memory-repositories/in-memory-power-curve-repository"
import {ListPowerCurvesUseCase} from "./list-power-curves-use-case"

const inMemoryPowerCurveRepository = new InMemoryPowerCurveRepository

const sut = new ListPowerCurvesUseCase(inMemoryPowerCurveRepository)

beforeAll(async () => {
  for (let i = 0; i < 30; i++) {
    await new MakePowerCurve().toDomain({
      override: {name: `${i}-example-power-curve-name`},
      inMemoryPowerCurveRepository
    })
  }
})

describe('List Power Curves Use Case', () => {
  it('should be able to list power curves', async () => {
    const powerCurve = await sut.execute({})

    expect(powerCurve).toHaveLength(5)
    expect(powerCurve[0].props.name).toStrictEqual('0-example-power-curve-name')
    expect(powerCurve).toBeInstanceOf(Array<PowerCurve>)
  })

  it('should be able to paginate', async () => {
    let powerCurve = await sut.execute({takePage: 5})

    expect(powerCurve).toHaveLength(5)
    expect(powerCurve[0].props.name).toStrictEqual('0-example-power-curve-name')
    expect(powerCurve).toBeInstanceOf(Array<PowerCurve>)

    powerCurve = await sut.execute({page: 2, takePage: 5})

    expect(powerCurve).toHaveLength(5)
    expect(powerCurve[0].props.name).toStrictEqual('5-example-power-curve-name')
    expect(powerCurve).toBeInstanceOf(Array<PowerCurve>)
  })
})
