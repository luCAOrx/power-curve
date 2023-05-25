import { MakePowerCurve } from "@test/factories/make-power-curve-factory";
import { InMemoryPowerCurveRepository } from "@test/in-memory-repositories/in-memory-power-curve-repository";

import { PowerCurveAlreadyExists } from "./errors/power-curve-already-exists";

const inMemoryPowerCurveRepository = new InMemoryPowerCurveRepository();

afterEach(() => {
  inMemoryPowerCurveRepository.powerCurves = [];
});

describe("Create Power Curve Use Case", () => {
  it("should be able to create a new power curve", async () => {
    const powerCurve = await new MakePowerCurve().toDomain({
      inMemoryPowerCurveRepository,
    });

    const {
      id,
      props: { name, file },
      created_at,
    } = powerCurve;

    expect(name).toEqual("example-power-curve-name");
    expect(file).toEqual("example-power-curve-file.csv");
    expect(id).toEqual(id);
    expect(created_at).toBeInstanceOf(Date);
    expect(inMemoryPowerCurveRepository.powerCurves).toHaveLength(1);
    expect(inMemoryPowerCurveRepository.powerCurves[0]).toStrictEqual(
      powerCurve
    );
  });

  it("should not be able to create a new power curve if name already exists", async () => {
    await new MakePowerCurve().toDomain({
      inMemoryPowerCurveRepository,
    });

    const powerCurve = new MakePowerCurve().toDomain({
      inMemoryPowerCurveRepository,
    });

    await expect(powerCurve).rejects.toEqual(new PowerCurveAlreadyExists());
    expect(inMemoryPowerCurveRepository.powerCurves).toHaveLength(1);
  });

  it("should not be able to create a new power curve without a name", async () => {
    const powerCurve = new MakePowerCurve()
      .toDomain({
        override: {
          name: "",
        },
        inMemoryPowerCurveRepository,
      })
      .then(
        async (powerCurve) =>
          await inMemoryPowerCurveRepository.create(powerCurve)
      );

    await expect(powerCurve).rejects.toEqual(
      new Error("The field name should not be empty")
    );
    expect(inMemoryPowerCurveRepository.powerCurves).toHaveLength(0);
  });

  it("should not be able to create a new power curve with a name longer than 255 characters", async () => {
    const powerCurve = new MakePowerCurve()
      .toDomain({
        override: {
          name: "example".repeat(256),
        },
        inMemoryPowerCurveRepository,
      })
      .then(
        async (powerCurve) =>
          await inMemoryPowerCurveRepository.create(powerCurve)
      );

    await expect(powerCurve).rejects.toEqual(
      new Error("The field name must be less than 255 characters")
    );
    expect(inMemoryPowerCurveRepository.powerCurves).toHaveLength(0);
  });

  it("should not be able to create a new power curve with a name less than 5 characters", async () => {
    const powerCurve = new MakePowerCurve()
      .toDomain({
        override: {
          name: "exam",
        },
        inMemoryPowerCurveRepository,
      })
      .then(
        async (powerCurve) =>
          await inMemoryPowerCurveRepository.create(powerCurve)
      );

    await expect(powerCurve).rejects.toEqual(
      new Error("The field name must be than 5 characters")
    );
    expect(inMemoryPowerCurveRepository.powerCurves).toHaveLength(0);
  });

  it("should not be able to create a new power curve without a file", async () => {
    const powerCurve = new MakePowerCurve()
      .toDomain({
        override: {
          file: "",
        },
        inMemoryPowerCurveRepository,
      })
      .then(
        async (powerCurve) =>
          await inMemoryPowerCurveRepository.create(powerCurve)
      );

    await expect(powerCurve).rejects.toEqual(
      new Error("The field file should not be empty")
    );
    expect(inMemoryPowerCurveRepository.powerCurves).toHaveLength(0);
  });

  it("should not be able to create a new power curve with a file longer than 200 characters", async () => {
    const powerCurve = new MakePowerCurve()
      .toDomain({
        override: {
          file: "example.csv".repeat(256),
        },
        inMemoryPowerCurveRepository,
      })
      .then(
        async (powerCurve) =>
          await inMemoryPowerCurveRepository.create(powerCurve)
      );

    await expect(powerCurve).rejects.toEqual(
      new Error("The field file must be less than 200 characters")
    );
    expect(inMemoryPowerCurveRepository.powerCurves).toHaveLength(0);
  });

  it("should not be able to create a new power curve with a file less than 25 characters", async () => {
    const powerCurve = new MakePowerCurve()
      .toDomain({
        override: {
          file: "e.csv",
        },
        inMemoryPowerCurveRepository,
      })
      .then(
        async (powerCurve) =>
          await inMemoryPowerCurveRepository.create(powerCurve)
      );

    await expect(powerCurve).rejects.toEqual(
      new Error("The file field must be more than 25 characters")
    );
    expect(inMemoryPowerCurveRepository.powerCurves).toHaveLength(0);
  });
});
