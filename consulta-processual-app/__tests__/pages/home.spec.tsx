import { render } from "@/test-utils/render";
import { screen } from "@testing-library/react";
import Home from "../../pages/index";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Home component", () => {
  it("should render the Busca component and the header", () => {
    render(<Home />);

    const svgElement = screen.getByTestId("home-icon");
    expect(svgElement).toBeInTheDocument();

    const buscaTitle = screen.getByTestId("search-title");
    expect(buscaTitle).toBeInTheDocument();
  });
});
