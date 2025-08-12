import dayjs from "dayjs";
import { getNextDays } from "./getNextDays";

describe("getNextDays", () => {
  it("should return the next 5 days in 'DD/MM' format", () => {
    const days = getNextDays();
    expect(days).toHaveLength(5);

    const today = new Date();
    for (let i = 0; i < 5; i++) {
      const expectedDate = new Date();
      expectedDate.setDate(today.getDate() + (i + 1));
      const expectedFormatted = dayjs(expectedDate).format("DD/MM");
      expect(days[i]).toBe(expectedFormatted);
    }
  });
});
