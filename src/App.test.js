import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the dye assistant heading", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", {
      name: /confocal microscope dye availability finder/i,
    })
  ).toBeInTheDocument();
});
