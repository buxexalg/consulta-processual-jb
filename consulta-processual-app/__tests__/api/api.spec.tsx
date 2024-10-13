import {
  buscarProcessoPorCNJ,
  buscarProcessosPorTribunal,
} from "@/pages/api/api";
import { TribunalEnum } from "@/types/processo.types";
import { ApolloClient } from "@apollo/client";
import createApolloClient from "../../pages/api/apollo-client";

jest.mock("../api/apollo-client", () => jest.fn());

describe("API Functions", () => {
  let mockClient: ApolloClient<any>;

  beforeEach(() => {
    mockClient = {
      query: jest.fn(),
    } as unknown as ApolloClient<any>;

    (createApolloClient as jest.Mock).mockReturnValue(mockClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("buscarProcessoPorCNJ", () => {
    it("should fetch processo by CNJ", async () => {
      const mockData = {
        buscarProcessoPorCNJ: {
          id: "1",
          numeroCNJ: "1234567-89.2020.1.23.4567",
          tribunal: TribunalEnum.STJ,
          data: "2020-01-01",
          movimentacoes: [],
          partes: [],
        },
      };

      (mockClient.query as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const result = await buscarProcessoPorCNJ("1234567-89.2020.1.23.4567");

      expect(createApolloClient).toHaveBeenCalled();
      expect(mockClient.query).toHaveBeenCalledWith({
        query: expect.anything(),
        variables: { numeroCNJ: "1234567-89.2020.1.23.4567" },
      });
      expect(result).toEqual({
        props: { processo: mockData },
      });
    });
  });

  describe("buscarProcessosPorTribunal", () => {
    it("should fetch processos by tribunal", async () => {
      const mockData = {
        buscarProcessosPorTribunal: [
          {
            id: "1",
            numeroCNJ: "1234567-89.2020.1.23.4567",
            tribunal: TribunalEnum.STJ,
            data: "2020-01-01",
            movimentacoes: [],
            partes: [],
          },
        ],
      };

      (mockClient.query as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const result = await buscarProcessosPorTribunal(TribunalEnum.STJ);

      expect(createApolloClient).toHaveBeenCalled();
      expect(mockClient.query).toHaveBeenCalledWith({
        query: expect.anything(),
        variables: { tribunal: TribunalEnum.STJ },
      });
      expect(result).toEqual({
        props: { processo: mockData },
      });
    });
  });
});
