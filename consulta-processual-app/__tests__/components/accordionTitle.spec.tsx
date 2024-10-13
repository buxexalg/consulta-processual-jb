import { TribunalEnum } from "@/types/processo.types";
import { screen } from "@testing-library/react";
import { render } from "@/test-utils/render";
import AccordionTitle from "@/pages/processos/[id]/accordionTitle";
import { formatDate } from "@/pages/processos/[id]/utils";

jest.mock("../../pages/processos/[id]/utils.ts", () => ({
  formatDate: jest.fn(),
}));

describe("AccordionTitle Component", () => {
  it("should render the correct title and date", () => {
    const props = {
      numeroCNJ: "1234567-89.2020.1.23.4567",
      tribunal: TribunalEnum.STJ,
      data: new Date("2020-01-01"),
    };

    (formatDate as jest.Mock).mockReturnValue("01/01/2020");

    render(<AccordionTitle {...props} />);

    expect(
      screen.getByText(`Processo n. ${props.numeroCNJ} do ${props.tribunal}`)
    ).toBeInTheDocument();

    expect(screen.getByText("Distribuído em 01/01/2020")).toBeInTheDocument();
  });
});
