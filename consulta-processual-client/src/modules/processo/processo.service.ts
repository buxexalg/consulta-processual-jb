import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProcessoMapper } from '../../database/mappers/processo.mapper';
import { PrismaService } from '../../database/services/prisma.service';
import { IQuery, Processo } from '../../graphql';

@Injectable()
export class ProcessoService implements IQuery {
  constructor(private prisma: PrismaService) {}

  async buscarProcessosPorTribunal(tribunal): Promise<Processo[]> {
    try {
      const response = await this.prisma.processo.findMany({
        where: { tribunal },
        include: {
          movimentacoes: true,
          partes: {
            select: {
              parte: true,
            },
          },
        },
      });

      return response.map((processo) => ProcessoMapper.fromPrisma(processo));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async buscarProcessoPorCNJ(numeroCNJ: string): Promise<Processo> {
    try {
      const response = await this.prisma.processo.findFirst({
        where: { numeroCNJ },
        include: {
          movimentacoes: true,
          partes: {
            select: {
              parte: true,
            },
          },
        },
      });

      if (!response) {
        throw new NotFoundException('Processo não encontrado');
      }

      return ProcessoMapper.fromPrisma(response);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
