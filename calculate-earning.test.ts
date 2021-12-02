import { expect, describe } from "@jest/globals";
import { calculateEarning } from "./app";

describe("Earning calculation", () => {
  test("it should be equal to 0", () => {
    const output = calculateEarning(0, 0, []);
    expect(output).toEqual(0);
  });
  test("it should be equal to 1", () => {
    const output = calculateEarning(1, 1, [1]);
    expect(output).toEqual(1);
  });
});
