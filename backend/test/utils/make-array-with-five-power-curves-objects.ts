import { type Response } from "supertest";

export function makeArrayWithFivePowerCurvesObjects({
  responseBody,
}: {
  responseBody: Response;
}): Response[] {
  return [responseBody];
}
