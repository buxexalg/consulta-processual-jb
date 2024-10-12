import { $Enums, movimentacao, parte, processo } from '@prisma/client';
import { Processo, TipoParte, Tribunal } from '../../graphql';

export interface ProcessoFromPrismaInput extends processo {
  partes: { parte: parte }[];
  movimentacoes: movimentacao[];
}

export class ProcessoMapper {
  static fromPrisma(processo: ProcessoFromPrismaInput): Processo {
    return {
      ...processo,
      tribunal: this.mapTribunal(processo.tribunal),
      movimentacoes: processo.movimentacoes.map((mov) => ({
        ...mov,
        dataDaMovimentacao: mov.dataDaMovimentacao,
        descricao: mov.descricao,
      })),
      partes: processo.partes.map((parte) => ({
        ...parte.parte,
        tipo: this.mapParte(parte.parte.tipo),
      })),
    };
  }

  static mapParte(parte: $Enums.TipoParte): TipoParte {
    switch (parte) {
      case $Enums.TipoParte.ADVOGADO:
        return TipoParte.ADVOGADO;
      case $Enums.TipoParte.JUIZ:
        return TipoParte.JUIZ;
      case $Enums.TipoParte.PARTE_ENVOLVIDA:
        return TipoParte.PARTE_ENVOLVIDA;
      default:
        throw new Error(`Parte ${parte} não mapeada!`);
    }
  }

  static mapTribunal(tribunal: $Enums.Tribunal): Tribunal {
    switch (tribunal) {
      case $Enums.Tribunal.STF:
        return Tribunal.STF;
      case $Enums.Tribunal.STJ:
        return Tribunal.STJ;
      case $Enums.Tribunal.TST:
        return Tribunal.TST;
      case $Enums.Tribunal.TSE:
        return Tribunal.TSE;
      case $Enums.Tribunal.STM:
        return Tribunal.STM;
      case $Enums.Tribunal.CNJ:
        return Tribunal.CNJ;
      case $Enums.Tribunal.TJAC:
        return Tribunal.TJAC;
      case $Enums.Tribunal.TJAL:
        return Tribunal.TJAL;
      case $Enums.Tribunal.TJAM:
        return Tribunal.TJAM;
      case $Enums.Tribunal.TJAP:
        return Tribunal.TJAP;
      case $Enums.Tribunal.TJBA:
        return Tribunal.TJBA;
      case $Enums.Tribunal.TJCE:
        return Tribunal.TJCE;
      case $Enums.Tribunal.TJDFT:
        return Tribunal.TJDFT;
      case $Enums.Tribunal.TJES:
        return Tribunal.TJES;
      case $Enums.Tribunal.TJGO:
        return Tribunal.TJGO;
      case $Enums.Tribunal.TJMA:
        return Tribunal.TJMA;
      case $Enums.Tribunal.TJMG:
        return Tribunal.TJMG;
      case $Enums.Tribunal.TJMS:
        return Tribunal.TJMS;
      case $Enums.Tribunal.TJMT:
        return Tribunal.TJMT;
      case $Enums.Tribunal.TJPA:
        return Tribunal.TJPA;
      case $Enums.Tribunal.TJPB:
        return Tribunal.TJPB;
      case $Enums.Tribunal.TJPE:
        return Tribunal.TJPE;
      case $Enums.Tribunal.TJPI:
        return Tribunal.TJPI;
      case $Enums.Tribunal.TJPR:
        return Tribunal.TJPR;
      case $Enums.Tribunal.TJRJ:
        return Tribunal.TJRJ;
      case $Enums.Tribunal.TJRN:
        return Tribunal.TJRN;
      case $Enums.Tribunal.TJRO:
        return Tribunal.TJRO;
      case $Enums.Tribunal.TJRR:
        return Tribunal.TJRR;
      case $Enums.Tribunal.TJRS:
        return Tribunal.TJRS;
      case $Enums.Tribunal.TJSC:
        return Tribunal.TJSC;
      case $Enums.Tribunal.TJSE:
        return Tribunal.TJSE;
      case $Enums.Tribunal.TJSP:
        return Tribunal.TJSP;
      case $Enums.Tribunal.TJTO:
        return Tribunal.TJTO;
      case $Enums.Tribunal.TRF1:
        return Tribunal.TRF1;
      case $Enums.Tribunal.TRF2:
        return Tribunal.TRF2;
      case $Enums.Tribunal.TRF3:
        return Tribunal.TRF3;
      case $Enums.Tribunal.TRF4:
        return Tribunal.TRF4;
      case $Enums.Tribunal.TRF5:
        return Tribunal.TRF5;
      case $Enums.Tribunal.TRT1:
        return Tribunal.TRT1;
      case $Enums.Tribunal.TRT2:
        return Tribunal.TRT2;
      case $Enums.Tribunal.TRT3:
        return Tribunal.TRT3;
      case $Enums.Tribunal.TRT4:
        return Tribunal.TRT4;
      case $Enums.Tribunal.TRT5:
        return Tribunal.TRT5;
      case $Enums.Tribunal.TRT6:
        return Tribunal.TRT6;
      case $Enums.Tribunal.TRT7:
        return Tribunal.TRT7;
      case $Enums.Tribunal.TRT8:
        return Tribunal.TRT8;
      case $Enums.Tribunal.TRT9:
        return Tribunal.TRT9;
      case $Enums.Tribunal.TRT10:
        return Tribunal.TRT10;
      case $Enums.Tribunal.TRT11:
        return Tribunal.TRT11;
      case $Enums.Tribunal.TRT12:
        return Tribunal.TRT12;
      case $Enums.Tribunal.TRT13:
        return Tribunal.TRT13;
      case $Enums.Tribunal.TRT14:
        return Tribunal.TRT14;
      case $Enums.Tribunal.TRT15:
        return Tribunal.TRT15;
      case $Enums.Tribunal.TRT16:
        return Tribunal.TRT16;
      case $Enums.Tribunal.TRT17:
        return Tribunal.TRT17;
      case $Enums.Tribunal.TRT18:
        return Tribunal.TRT18;
      case $Enums.Tribunal.TRT19:
        return Tribunal.TRT19;
      case $Enums.Tribunal.TRT20:
        return Tribunal.TRT20;
      case $Enums.Tribunal.TRT21:
        return Tribunal.TRT21;
      case $Enums.Tribunal.TRT22:
        return Tribunal.TRT22;
      case $Enums.Tribunal.TRT23:
        return Tribunal.TRT23;
      case $Enums.Tribunal.TRT24:
        return Tribunal.TRT24;
      default:
        throw new Error(`Tribunal ${tribunal} não mapeado!`);
    }
  }
}
