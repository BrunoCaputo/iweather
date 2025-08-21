import {
  getStorageCity,
  removeStorageCity,
  saveStorageCity,
} from "@libs/asyncStorage/cityStorage";
import { CityProps } from "@services/getCityByNameService";

describe("Storage: CityStorage", () => {
  const newCity: CityProps = {
    id: "1",
    name: "São Paulo",
    latitude: 123,
    longitude: 456,
  };

  it("should return null when don't have a city stored", async () => {
    const response = await getStorageCity();

    expect(response).toBeNull();
  });

  it("should store a city and return the stored value", async () => {
    await saveStorageCity(newCity);

    const response = await getStorageCity();

    expect(response).toEqual(newCity);
  });

  it("should remove city from storage", async () => {
    await saveStorageCity(newCity);
    await removeStorageCity();

    const response = await getStorageCity();

    expect(response).toBeNull();
  });
});
