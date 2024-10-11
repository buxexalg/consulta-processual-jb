import { TipoParte } from "@/types/processo.types";
import { formatInTimeZone } from "date-fns-tz";

export const formatDate = (date: Date) => {
  return formatInTimeZone(new Date(date), "UTC", "dd/MM/yyyy");
};

export function converterTipoParte(tipoParte: string): TipoParte | string {
  switch (tipoParte) {
    case "ADVOGADO":
      return TipoParte.ADVOGADO;
    case "PARTE_ENVOLVIDA":
      return TipoParte.PARTE_ENVOLVIDA;
    case "JUIZ":
      return TipoParte.JUIZ;
    default:
      return "";
  }
}
