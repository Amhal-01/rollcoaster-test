import { expect, describe } from "@jest/globals";
import { calculateEarning } from "./app";

describe("Earning calculation", () => {
  test("it should equal to 0", () => {
    const output = calculateEarning(0, 0, []);
    expect(output).toEqual(0);
  });
  test("it should equal to 1", () => {
    const output = calculateEarning(1, 1, [1]);
    expect(output).toEqual(1);
  });
  test("it should equal to 7", () => {
    const output = calculateEarning(3, 3, [3, 1, 1, 2]);
    expect(output).toEqual(7);
  });
  test("it should equal to 100", () => {
    const output = calculateEarning(10, 100, [1]);
    expect(output).toEqual(100);
  });
});
