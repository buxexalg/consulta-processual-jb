import {
  buscarProcessoPorCNJ,
  buscarProcessosPorTribunal,
} from "@/pages/api/api";
import { render } from "@/test-utils/render";
import { Processo, TribunalEnum } from "@/types/processo.types";
import { fireEvent, screen } from "@testing-library/react";
import Page, { getServerSideProps } from "../../pages/processos/[id]";

const mockProcessos: Processo[] = [
  {
    numeroCNJ: "1234567-89.2020.1.23.4567",
    tribunal: TribunalEnum.TJSP,
    data: "2020-01-01",
    movimentacoes: [
      {
        dataDaMovimentacao: "2020-02-01",
        descricao: "Movimentação 1",
      },
    ],
    partes: [
      {
        nome: "Parte 1",
        tipo: "Autor",
        informacaoExtra: "Informação extra 1",
      },
    ],
  },
];

jest.mock("../api/api");

describe("Page component", () => {
  describe("gerServerSideProps", () => {
    it("should fetch processos by tribunal if query string is a TribunalEnum", async () => {
      const mockTribunalData = {
        props: {
          processo: {
            buscarProcessosPorTribunal: [
              { numeroCNJ: "1234567-89.2020.1.23.4567" },
            ],
          },
        },
      };

      (buscarProcessosPorTribunal as jest.Mock).mockResolvedValueOnce(
        mockTribunalData
      );

      const context = {
        query: { id: TribunalEnum.TJSP },
      };

      const result = await getServerSideProps(context as any);

      expect(buscarProcessosPorTribunal).toHaveBeenCalledWith(
        TribunalEnum.TJSP
      );

      expect(result).toEqual({
        props: {
          processos: mockTribunalData.props.processo.buscarProcessosPorTribunal,
        },
      });
    });

    it("should fetch processo by CNJ if query string is a CNJ number", async () => {
      const mockCNJData = {
        props: {
          processo: {
            buscarProcessoPorCNJ: { numeroCNJ: "1234567-89.2020.1.23.4567" },
          },
        },
      };

      (buscarProcessoPorCNJ as jest.Mock).mockResolvedValueOnce(mockCNJData);

      const context = {
        query: { id: "1234567-89.2020.1.23.4567" },
      };

      const result = await getServerSideProps(context as any);

      expect(buscarProcessoPorCNJ).toHaveBeenCalledWith(
        "1234567-89.2020.1.23.4567"
      );

      expect(result).toEqual({
        props: {
          processos: [mockCNJData.props.processo.buscarProcessoPorCNJ],
        },
      });
    });

    it("should return undefined if query string is empty", async () => {
      const context = {
        query: { id: "" },
      };

      const result = await getServerSideProps(context as any);

      expect(result).toBeUndefined();
    });
  });

  describe("Content", () => {
    it("should render the processos passed via props", () => {
      render(<Page processos={mockProcessos} />);

      const accordionControl = screen.getByTestId("accordion-control");

      expect(accordionControl).toBeInTheDocument();

      fireEvent.click(accordionControl);

      const cnjTitle = screen.getByText(
        "Processo n. 1234567-89.2020.1.23.4567 do TJSP"
      );
      expect(cnjTitle).toBeInTheDocument();

      const movimentacao = screen.getByText("Movimentação 1");
      expect(movimentacao).toBeInTheDocument();

      const parte = screen.getByText("Parte 1");
      expect(parte).toBeInTheDocument();
    });

    it("should render a message when no processos are found", () => {
      render(<Page processos={[]} />);

      const noProcessosMessage = screen.getByText(
        /Nenhum processo encontrado/i
      );
      expect(noProcessosMessage).toBeInTheDocument();
    });
  });
});
