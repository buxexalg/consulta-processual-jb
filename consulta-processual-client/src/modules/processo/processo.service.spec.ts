import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient, TipoParte, Tribunal } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { ProcessoFromPrismaInput, ProcessoMapper } from '../../database/mappers/processo.mapper';
import { PrismaService } from '../../database/services/prisma.service';
import { TipoParte as GraphqlTipoParte, Tribunal as GraphqlTribunal } from '../../graphql';
import { ProcessoResolver } from './processo.resolver';
import { ProcessoService } from './processo.service';

const mockProcessos: ProcessoFromPrismaInput[] = [
  {
    id: 1,
    data: new Date('2023-01-10'),
    numeroCNJ: '0000001-23.2023.1.00.0000',
    tribunal: Tribunal.STF,
    movimentacoes: [
      {
        id: 7,
        idProcesso: 1,
        dataDaMovimentacao: new Date('2023-01-15'),
        descricao: 'Ação protocolada',
      },
      {
        id: 8,
        idProcesso: 1,
        dataDaMovimentacao: new Date('2023-01-20'),
        descricao: 'Decisão inicial',
      },
    ],
    partes: [
      {
        parte: {
          id: 12,
          nome: 'João da Silva',
          tipo: TipoParte.ADVOGADO,
          informacaoExtra: 'OAB-SP 123456',
        },
      },
      {
        parte: {
          id: 13,
          nome: 'Maria Souza',
          tipo: TipoParte.PARTE_ENVOLVIDA,
          informacaoExtra: null,
        },
      },
    ],
  },
  {
    id: 3,
    data: new Date('2022-09-14'),
    numeroCNJ: '1000003-34.2022.3.00.0000',
    tribunal: Tribunal.STJ,
    movimentacoes: [
      {
        id: 6,
        idProcesso: 3,
        dataDaMovimentacao: new Date('2022-09-18'),
        descricao: 'Ação movida contra o réu',
      },
      {
        id: 9,
        idProcesso: 3,
        dataDaMovimentacao: new Date('2022-09-25'),
        descricao: 'Julgamento realizado',
      },
    ],
    partes: [
      {
        parte: {
          id: 10,
          nome: 'Lucas Santos',
          tipo: TipoParte.ADVOGADO,
          informacaoExtra: 'OAB-BA 456789',
        },
      },
      {
        parte: {
          id: 11,
          nome: 'Fernanda Costa',
          tipo: TipoParte.PARTE_ENVOLVIDA,
          informacaoExtra: null,
        },
      },
    ],
  },
];

describe('ProcessoService', () => {
  let service: ProcessoService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcessoResolver,
        ProcessoService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<ProcessoService>(ProcessoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaMock).toBeDefined();
  });

  describe('buscarProcessosPorTribunal', () => {
    it('should return a list of Processos equivalent to the tribunal filter', async () => {
      const mockMapperResult = [
        {
          id: 1,
          data: new Date('2023-01-10'),
          numeroCNJ: '0000001-23.2023.1.00.0000',
          tribunal: Tribunal.STF,
          movimentacoes: [
            {
              id: 7,
              idProcesso: 1,
              dataDaMovimentacao: new Date('2023-01-15'),
              descricao: 'Ação protocolada',
            },
            {
              id: 8,
              idProcesso: 1,
              dataDaMovimentacao: new Date('2023-01-20'),
              descricao: 'Decisão inicial',
            },
          ],
          partes: [
            {
              id: 12,
              nome: 'João da Silva',
              tipo: TipoParte.ADVOGADO,
              informacaoExtra: 'OAB-SP 123456',
            },
            {
              id: 13,
              nome: 'Maria Souza',
              tipo: TipoParte.PARTE_ENVOLVIDA,
              informacaoExtra: null,
            },
          ],
        },
      ];

      prismaMock.processo.findMany.mockResolvedValue(mockProcessos.slice(0, 1));
      jest.spyOn(ProcessoMapper, 'fromPrisma').mockImplementation((processo) => ({
        data: processo.data,
        id: processo.id,
        numeroCNJ: processo.numeroCNJ,
        partes: processo.partes.map((parte) => ({
          id: parte.parte.id,
          nome: parte.parte.nome,
          tipo: parte.parte.tipo as GraphqlTipoParte,
          informacaoExtra: parte.parte.informacaoExtra,
        })),
        tribunal: processo.tribunal as GraphqlTribunal,
        movimentacoes: processo.movimentacoes.map((movimentacao) => ({
          ...movimentacao,
          id: movimentacao.id,
          dataDaMovimentacao: movimentacao.dataDaMovimentacao,
          descricao: movimentacao.descricao,
        })),
      }));

      const response = await service.buscarProcessosPorTribunal(Tribunal.STF);

      expect(response).toEqual(mockMapperResult);

      expect(prismaMock.processo.findMany).toHaveBeenCalledWith({
        where: { tribunal: Tribunal.STF },
        include: {
          movimentacoes: true,
          partes: {
            select: {
              parte: true,
            },
          },
        },
      });

      expect(ProcessoMapper.fromPrisma).toHaveBeenCalledTimes(1);
      expect(ProcessoMapper.fromPrisma).toHaveBeenNthCalledWith(1, mockProcessos[0]);
    });

    it('should return an empty list of Processos when there isnt a equivalent tribunal', async () => {
      prismaMock.processo.findMany.mockResolvedValue([]);

      const response = await service.buscarProcessosPorTribunal(Tribunal.TJDFT);

      expect(response).toEqual([]);

      expect(prismaMock.processo.findMany).toHaveBeenCalledWith({
        where: { tribunal: Tribunal.TJDFT },
        include: {
          movimentacoes: true,
          partes: {
            select: {
              parte: true,
            },
          },
        },
      });

      expect(ProcessoMapper.fromPrisma).toHaveBeenCalledTimes(0);
    });

    it('should throw InternalServerErrorException when it fails', async () => {
      jest
        .spyOn(service, 'buscarProcessosPorTribunal')
        .mockRejectedValue(new InternalServerErrorException());

      try {
        await service.buscarProcessosPorTribunal(Tribunal.STF);
      } catch (error) {
        expect(error).toEqual(new InternalServerErrorException(error.message));
      }
    });
  });

  describe('buscarProcessoPorCNJ', () => {
    it('should return a Processo equivalent to the CNJ filter', async () => {
      const mockMapperResult = {
        id: 1,
        data: new Date('2023-01-10'),
        numeroCNJ: '0000001-23.2023.1.00.0000',
        tribunal: Tribunal.STF,
        movimentacoes: [
          {
            id: 7,
            idProcesso: 1,
            dataDaMovimentacao: new Date('2023-01-15'),
            descricao: 'Ação protocolada',
          },
          {
            id: 8,
            idProcesso: 1,
            dataDaMovimentacao: new Date('2023-01-20'),
            descricao: 'Decisão inicial',
          },
        ],
        partes: [
          {
            id: 12,
            nome: 'João da Silva',
            tipo: TipoParte.ADVOGADO,
            informacaoExtra: 'OAB-SP 123456',
          },
          {
            id: 13,
            nome: 'Maria Souza',
            tipo: TipoParte.PARTE_ENVOLVIDA,
            informacaoExtra: null,
          },
        ],
      };

      prismaMock.processo.findFirst.mockResolvedValue(mockProcessos[0]);
      jest.spyOn(ProcessoMapper, 'fromPrisma').mockImplementation((processo) => ({
        data: processo.data,
        id: processo.id,
        numeroCNJ: processo.numeroCNJ,
        partes: processo.partes.map((parte) => ({
          id: parte.parte.id,
          nome: parte.parte.nome,
          tipo: parte.parte.tipo as GraphqlTipoParte,
          informacaoExtra: parte.parte.informacaoExtra,
        })),
        tribunal: processo.tribunal as GraphqlTribunal,
        movimentacoes: processo.movimentacoes.map((movimentacao) => ({
          ...movimentacao,
          id: movimentacao.id,
          dataDaMovimentacao: movimentacao.dataDaMovimentacao,
          descricao: movimentacao.descricao,
        })),
      }));

      const response = await service.buscarProcessoPorCNJ('0000001-23.2023.1.00.0000');

      expect(response).toEqual(mockMapperResult);

      expect(prismaMock.processo.findFirst).toHaveBeenCalledWith({
        where: { numeroCNJ: '0000001-23.2023.1.00.0000' },
        include: {
          movimentacoes: true,
          partes: {
            select: {
              parte: true,
            },
          },
        },
      });

      expect(ProcessoMapper.fromPrisma).toHaveBeenCalledTimes(1);
      expect(ProcessoMapper.fromPrisma).toHaveBeenNthCalledWith(1, mockProcessos[0]);
    });

    it('should return an empty list of Processos when there isnt a equivalent CNJ', async () => {
      prismaMock.processo.findFirst.mockResolvedValue(null);

      try {
        await service.buscarProcessoPorCNJ('0000001-23.2023.1.00.0009');
      } catch (error) {
        expect(error).toEqual(new NotFoundException('Processo não encontrado'));
      }

      expect(ProcessoMapper.fromPrisma).toHaveBeenCalledTimes(0);
    });

    it('should throw InternalServerErrorException when it fails', async () => {
      jest
        .spyOn(service, 'buscarProcessoPorCNJ')
        .mockRejectedValue(new InternalServerErrorException());

      try {
        await service.buscarProcessoPorCNJ('0000001-23.2023.1.00.0000');
      } catch (error) {
        expect(error).toEqual(new InternalServerErrorException(error.message));
      }
    });
  });
});
