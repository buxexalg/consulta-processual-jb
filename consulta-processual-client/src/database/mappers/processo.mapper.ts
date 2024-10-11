import { movimentacao, parte, processo } from '@prisma/client';
import { Processo, TipoParte, Tribunal } from 'src/graphql';

interface ProcessoFromPrismaInput extends processo {
  partes: { parte: parte }[];
  movimentacoes: movimentacao[];
}

export class ProcessoMapper {
  static fromPrisma(processoFromPrisma: ProcessoFromPrismaInput): Processo {
    if (!processoFromPrisma) return null;

    const processosComPartes = {
      ...processoFromPrisma,
      tribunal: Tribunal[processoFromPrisma.tribunal as keyof typeof Tribunal],
      partes: processoFromPrisma.partes.map((p) => ({
        ...p.parte,
        tipo: TipoParte[p.parte.tipo as keyof typeof TipoParte],
      })),
    };

    return processosComPartes;
  }
}
