import { resolve } from "node:path";
import request from "supertest";

import { type PowerCurve } from "@domain/entities/power-curve";
import { CreatePowerCurveUseCase } from "@domain/use-case/create-power-curve-use-case";
import { app } from "@infra/app";
import { type InMemoryPowerCurveRepository } from "@test/in-memory-repositories/in-memory-power-curve-repository";

interface CreatePowerCurveDTO {
  name: string;
  file: string;
}

type Override = Partial<CreatePowerCurveDTO>;

export class MakePowerCurve {
  async toDomain({
    inMemoryPowerCurveRepository,
    override,
  }: {
    inMemoryPowerCurveRepository: InMemoryPowerCurveRepository;
    override?: Override;
  }): Promise<PowerCurve> {
    const createPowerCurveUseCase = await new CreatePowerCurveUseCase(
      inMemoryPowerCurveRepository
    ).execute({
      name: "example-power-curve-name",
      file: "example-power-curve-file.csv",
      ...override,
    });

    return createPowerCurveUseCase;
  }

  async toHTTP({
    file,
    name,
  }: {
    name?: string;
    file?: string;
  }): Promise<request.Test> {
    const filePath = resolve(
      __dirname,
      "..",
      "files/example-Abr-2017-curva-potencia-windbox.csv"
    );

    return await request(app)
      .post("/power_curve/create")
      .field("name", name ?? "curva-de-potência-04-2017")
      .attach("file", file ?? filePath);
  }
}
