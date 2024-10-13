import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Busca from "../pages/busca";
import { render } from "../test-utils/render";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Busca component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the form elements correctly", () => {
    render(<Busca />);

    expect(screen.getByTestId("search-title")).toBeInTheDocument();
    expect(screen.getByTestId("search-subtitle")).toBeInTheDocument();
    expect(screen.getByTestId("search-cnj-input")).toBeInTheDocument();
    expect(screen.getByTestId("search-tribunal-input")).toBeInTheDocument();
    expect(screen.getByTestId("search-submit-button")).toBeInTheDocument();
  });

  it("should navigate to CNJ search when valid CNJ is provided", async () => {
    render(<Busca />);

    const cnjInput = screen.getByTestId("search-cnj-input");
    fireEvent.change(cnjInput, {
      target: { value: "1234567-12.2023.1.00.1234" },
    });

    const submitButton = screen.getByTestId("search-submit-button");
    fireEvent.click(submitButton);

    expect(mockPush).toHaveBeenCalledWith(
      "/processos/1234567-12.2023.1.00.1234"
    );
  });

  it("should navigate to tribunal search when tribunal is selected", async () => {
    render(<Busca />);

    const tribunalSelect = screen.getByTestId("search-tribunal-input");
    fireEvent.change(tribunalSelect, { target: { value: "STF" } });

    const submitButton = screen.getByTestId("search-submit-button");
    fireEvent.click(submitButton);

    expect(mockPush).toHaveBeenCalledWith("/processos/STF");
  });

  it("should show validation error when no CNJ or tribunal is provided", async () => {
    render(<Busca />);

    const submitButton = screen.getByTestId("search-submit-button");
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText((content, element) => {
      return content.startsWith("Selecione um tribunal");
    });

    expect(errorMessage).toBeInTheDocument();
  });
});
