import request from "supertest";

import { app } from "@infra/app";

export class MakePowerCurveList {
  async toHTTP({
    page,
    takePage,
  }: {
    page: number;
    takePage: number;
  }): Promise<request.Response> {
    return await request(app).get("/power_curve/list").query({
      page,
      takePage,
    });
  }
}
