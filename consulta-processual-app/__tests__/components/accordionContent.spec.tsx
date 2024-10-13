import { screen } from "@testing-library/react";
import AccordionContent from "../pages/processos/[id]/accordionContent";
import { render } from "@/test-utils/render";

describe("AccordionContent Component", () => {
  it("should render the title, description, and extra info when provided", () => {
    const props = {
      title: "Título do Processo",
      description: "Descrição do processo",
      extraInfo: "Informação adicional",
      showDivider: true,
    };

    render(<AccordionContent {...props} />);

    expect(screen.getByText(props.title)).toBeInTheDocument();

    expect(screen.getByText(props.description)).toBeInTheDocument();

    expect(screen.getByText(props.extraInfo!)).toBeInTheDocument();

    expect(screen.queryByRole("separator")).toBeInTheDocument();
  });

  it("should not render extra info if it's not provided", () => {
    const props = {
      title: "Título do Processo",
      description: "Descrição do processo",
      showDivider: false,
    };

    render(<AccordionContent {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();

    const extraInfoElement = screen.queryByText("Informação adicional");
    expect(extraInfoElement).not.toBeInTheDocument();
  });

  it("should not render the Divider if showDivider is false", () => {
    const props = {
      title: "Título do Processo",
      description: "Descrição do processo",
      showDivider: false,
    };

    render(<AccordionContent {...props} />);

    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
  });
});
