import { Test, TestingModule } from '@nestjs/testing';
import { ProcessoResolver } from './processo.resolver';
import { ProcessoService } from './processo.service';
import { Tribunal, Processo } from '../../graphql';

describe('ProcessoResolver', () => {
  let resolver: ProcessoResolver;
  let processoService: ProcessoService;

  const mockProcessos: Processo[] = [
    {
      id: 1,
      data: new Date(),
      numeroCNJ: '0000001-23.2023.1.00.0000',
      tribunal: Tribunal.STF,
      movimentacoes: [],
      partes: [],
    },
    {
      id: 2,
      data: new Date(),
      numeroCNJ: '0000002-23.2023.1.00.0000',
      tribunal: Tribunal.STJ,
      movimentacoes: [],
      partes: [],
    },
  ];

  const mockProcesso: Processo = {
    id: 1,
    data: new Date(),
    numeroCNJ: '0000001-23.2023.1.00.0000',
    tribunal: Tribunal.STF,
    movimentacoes: [],
    partes: [],
  };

  const mockProcessoService = {
    buscarProcessosPorTribunal: jest.fn(),
    buscarProcessoPorCNJ: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcessoResolver,
        {
          provide: ProcessoService,
          useValue: mockProcessoService,
        },
      ],
    }).compile();

    resolver = module.get<ProcessoResolver>(ProcessoResolver);
    processoService = module.get<ProcessoService>(ProcessoService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('buscarProcessosPorTribunal', () => {
    it('should return a list of Processos by tribunal', async () => {
      mockProcessoService.buscarProcessosPorTribunal.mockResolvedValue(mockProcessos);

      const result = await resolver.buscarProcessosPorTribunal(Tribunal.STF);

      expect(result).toEqual(mockProcessos);
      expect(processoService.buscarProcessosPorTribunal).toHaveBeenCalledWith(Tribunal.STF);
    });
  });

  describe('buscarProcessoPorCNJ', () => {
    it('should return a Processo by CNJ number', async () => {
      mockProcessoService.buscarProcessoPorCNJ.mockResolvedValue(mockProcesso);

      const result = await resolver.buscarProcessoPorCNJ('0000001-23.2023.1.00.0000');

      expect(result).toEqual(mockProcesso);
      expect(processoService.buscarProcessoPorCNJ).toHaveBeenCalledWith('0000001-23.2023.1.00.0000');
    });
  });
});