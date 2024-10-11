export enum TribunalEnum {
  STF = "STF",
  STJ = "STJ",
  TST = "TST",
  TSE = "TSE",
  STM = "STM",
  CNJ = "CNJ",
  TJAC = "TJAC",
  TJAL = "TJAL",
  TJAM = "TJAM",
  TJAP = "TJAP",
  TJBA = "TJBA",
  TJCE = "TJCE",
  TJDFT = "TJDFT",
  TJES = "TJES",
  TJGO = "TJGO",
  TJMA = "TJMA",
  TJMG = "TJMG",
  TJMS = "TJMS",
  TJMT = "TJMT",
  TJPA = "TJPA",
  TJPB = "TJPB",
  TJPE = "TJPE",
  TJPI = "TJPI",
  TJPR = "TJPR",
  TJRJ = "TJRJ",
  TJRN = "TJRN",
  TJRO = "TJRO",
  TJRR = "TJRR",
  TJRS = "TJRS",
  TJSC = "TJSC",
  TJSE = "TJSE",
  TJSP = "TJSP",
  TJTO = "TJTO",
  TRF1 = "TRF1",
  TRF2 = "TRF2",
  TRF3 = "TRF3",
  TRF4 = "TRF4",
  TRF5 = "TRF5",
  TRT1 = "TRT1",
  TRT2 = "TRT2",
  TRT3 = "TRT3",
  TRT4 = "TRT4",
  TRT5 = "TRT5",
  TRT6 = "TRT6",
  TRT7 = "TRT7",
  TRT8 = "TRT8",
  TRT9 = "TRT9",
  TRT10 = "TRT10",
  TRT11 = "TRT11",
  TRT12 = "TRT12",
  TRT13 = "TRT13",
  TRT14 = "TRT14",
  TRT15 = "TRT15",
  TRT16 = "TRT16",
  TRT17 = "TRT17",
  TRT18 = "TRT18",
  TRT19 = "TRT19",
  TRT20 = "TRT20",
  TRT21 = "TRT21",
  TRT22 = "TRT22",
  TRT23 = "TRT23",
  TRT24 = "TRT24",
}

export enum TipoParte {
  ADVOGADO = "Advogado",
  PARTE_ENVOLVIDA = "Parte envolvida",
  JUIZ = "Juiz",
}

export interface Processo {
  id: number;
  numeroCNJ: string;
  tribunal: TribunalEnum;
  data: Date;
  movimentacoes: Movimentacao[];
  partes: Parte[];
}

export interface Movimentacao {
  id: number;
  dataDaMovimentacao: Date;
  descricao: string;
}

export interface Parte {
  id: number;
  nome: string;
  tipo: TipoParte;
  informacaoExtra?: string;
}
