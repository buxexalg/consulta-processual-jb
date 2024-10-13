import { TipoParte } from "@/types/processo.types";
import { converterTipoParte, formatDate } from "../pages/processos/[id]/utils";

jest
  .spyOn(global.Date, "now")
  .mockImplementation(() => new Date("2024-10-11T00:00:00Z").getTime());

describe("Utils functions", () => {
  describe("formatDate", () => {
    it("should format the date correctly to dd/MM/yyyy", () => {
      const date = new Date("2024-01-01T12:00:00Z");
      const formattedDate = formatDate(date);

      expect(formattedDate).toBe("01/01/2024");
    });

    it("should handle different timezones and always return UTC", () => {
      const date = new Date("2024-10-10T23:00:00Z");
      const formattedDate = formatDate(date);

      expect(formattedDate).toBe("10/10/2024");
    });
  });

  describe("converterTipoParte", () => {
    it("should return the correct enum value for ADVOGADO", () => {
      const result = converterTipoParte("ADVOGADO");
      expect(result).toBe(TipoParte.ADVOGADO);
    });

    it("should return the correct enum value for PARTE_ENVOLVIDA", () => {
      const result = converterTipoParte("PARTE_ENVOLVIDA");
      expect(result).toBe(TipoParte.PARTE_ENVOLVIDA);
    });

    it("should return the correct enum value for JUIZ", () => {
      const result = converterTipoParte("JUIZ");
      expect(result).toBe(TipoParte.JUIZ);
    });

    it("should return an empty string for an unknown value", () => {
      const result = converterTipoParte("INVALID_VALUE");
      expect(result).toBe("");
    });
  });
});
