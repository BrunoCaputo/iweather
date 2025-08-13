import { fireEvent, render, screen } from "@testing-library/react-native";

import { SelectList } from "@components/SelectList";
import { CityProps } from "@services/getCityByNameService";

describe("Component: SelectList", () => {
  it("should return the selected city details", async () => {
    const data: CityProps[] = [
      { id: "1", name: "Campinas", latitude: 123, longitude: 456 },
      { id: "2", name: "Campo grande", latitude: 456, longitude: 123 },
    ];

    render(<SelectList data={data} onChange={() => {}} onPress={() => {}} />);

    const selectedCity = screen.getByText(/campo/i);
    fireEvent.press(selectedCity);
  });
});
