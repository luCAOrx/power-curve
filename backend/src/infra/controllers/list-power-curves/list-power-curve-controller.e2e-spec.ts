import { readdirSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";
import request from "supertest";

import { app } from "@infra/app";
import { MakePowerCurve } from "@test/factories/make-power-curve-factory";
import { MakePowerCurveList } from "@test/factories/make-power-curve-list-factory";
import { makeArrayWithFivePowerCurvesObjects } from "@test/utils/make-array-with-five-power-curves-objects";

let testUploadsDirectory = [""];

beforeAll(async () => {
  for (let i = 0; i < 30; i++) {
    await new MakePowerCurve().toHTTP({
      name: `${i}-example-power-curve-name`,
    });

    const testFilePath = resolve(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "test",
      "uploads"
    );

    testUploadsDirectory = readdirSync(testFilePath);
  }
});

afterAll(() => {
  testUploadsDirectory.map((file) => {
    const fileDir = resolve(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "test",
      "uploads",
      `${file}`
    );

    if (file !== ".gitkeep") unlinkSync(fileDir);
  });
});

describe("List Power Curves Controller", () => {
  it("should be able to list power curves", async () => {
    const { body, statusCode } = await new MakePowerCurveList().toHTTP({
      page: 1,
      takePage: 5,
    });

    makeArrayWithFivePowerCurvesObjects({ responseBody: body }).map(
      (powerCurveOrPowerCurves) => {
        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveLength(5);
        expect(body).toStrictEqual(powerCurveOrPowerCurves);
      }
    );
  });

  it("should not be able to list power curves without required query params", async () => {
    const { body, statusCode } = await request(app).get("/power_curve/list");

    expect(statusCode).toStrictEqual(400);
    expect(body).toStrictEqual({
      statusCode: 400,
      message: "The query params should not be empty",
      error: "Bad request",
    });
  });

  it("should be able to paginate", async () => {
    const { body: pageOneBodyResponse, statusCode: pageOneStatusCode } =
      await new MakePowerCurveList().toHTTP({ page: 1, takePage: 5 });

    makeArrayWithFivePowerCurvesObjects({
      responseBody: pageOneBodyResponse,
    }).map((powerCurveOrPowerCurves) => {
      expect(pageOneStatusCode).toStrictEqual(200);
      expect(pageOneBodyResponse).toHaveLength(5);
      expect(pageOneBodyResponse).toStrictEqual(powerCurveOrPowerCurves);
    });

    const { body: pageTwoBodyResponse, statusCode: pageTwoStatusCode } =
      await new MakePowerCurveList().toHTTP({ page: 2, takePage: 5 });

    makeArrayWithFivePowerCurvesObjects({
      responseBody: pageTwoBodyResponse,
    }).map((powerCurveOrPowerCurves) => {
      expect(pageTwoStatusCode).toStrictEqual(200);
      expect(pageTwoBodyResponse).toHaveLength(5);
      expect(pageTwoBodyResponse).toStrictEqual(powerCurveOrPowerCurves);
    });
  });
});
