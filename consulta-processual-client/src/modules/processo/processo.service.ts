import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';
import { ProcessoMapper } from 'src/database/mappers/processo.mapper';
import { IQuery, Processo } from 'src/graphql';

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
