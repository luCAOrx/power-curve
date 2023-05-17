import {PowerCurve} from "@domain/entities/power-curve";
import {PowerCurveRepository} from "@domain/repositories/power-curve-repository";
import {PowerCurveMapper} from "@infra/mappers/power-curve-mapper";
import {PrismaClient} from "@prisma/client";

const prismaClient = new PrismaClient()

export class PrismaPowerCurveRepository implements PowerCurveRepository {
  async exists(name: string): Promise<boolean> {
    const powerCurveExists = await prismaClient.powerCurve.findUnique({
      where: {name}
    })


    return !!powerCurveExists
  }

  async create(powerCurve: PowerCurve): Promise<PowerCurve> {
    const {
      id,
      name,
      file,
      created_at
    } = PowerCurveMapper.toPersistence(powerCurve)

    const createdPowerCurve = await prismaClient.powerCurve.create({
      data: {
        id,
        name,
        file,
        created_at
      }
    })

    return PowerCurveMapper.toDomain(createdPowerCurve)
  }

  async findMany(page: number, takePage: number): Promise<PowerCurve[]> {
    const powerCurves = await prismaClient.powerCurve.findMany({
      orderBy: {created_at: 'desc'},
      take: takePage,
      skip: (page - 1) * takePage
    })

    return powerCurves.map(powerCurve => PowerCurveMapper.toDomain(powerCurve))
  }
}
