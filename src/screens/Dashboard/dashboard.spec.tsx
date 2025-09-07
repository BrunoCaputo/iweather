import { mockWeatherAPIResponse } from "@__tests__/mocks/api/mockWeatherAPIResponse";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@__tests__/utils/customRender";
import { api } from "@services/api";
import { Dashboard } from "@screens/Dashboard";
import { saveStorageCity } from "@libs/asyncStorage/cityStorage";
import { mockCityAPIResponse } from "@__tests__/mocks/api/mockCityAPIResponse";

describe("Screen: Dashboard", () => {
  beforeAll(async () => {
    const city = {
      id: "1",
      name: "Rio do Sul, BR",
      latitude: 123,
      longitude: 456,
    };

    await saveStorageCity(city);
  });

  it("should show city weather", async () => {
    jest.spyOn(api, "get").mockResolvedValue({ data: mockWeatherAPIResponse });

    render(<Dashboard />);

    const cityName = screen.findByText(/rio do sul/i);

    await waitFor(() => {
      expect(cityName).toBeTruthy();
    });
  });

  it("should show another selected weather city", async () => {
    jest
      .spyOn(api, "get")
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse })
      .mockResolvedValueOnce({ data: mockCityAPIResponse })
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse });

    render(<Dashboard />);

    await waitForElementToBeRemoved(() => screen.queryByTestId("loading"));

    const cityName = "São Paulo";

    const search = screen.getByTestId("search-input");
    fireEvent.changeText(search, cityName);

    const cityOption = await screen.findByText(cityName, { exact: false });
    fireEvent.press(cityOption);

    await waitFor(() => {
      expect(screen.getByText(cityName, { exact: false })).toBeTruthy();
    });
  });
});
