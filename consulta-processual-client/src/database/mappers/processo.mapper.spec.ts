import { ProcessoFromPrismaInput, ProcessoMapper } from './processo.mapper';
import { $Enums, processo, movimentacao, parte } from '@prisma/client';
import { Tribunal, TipoParte } from '../../graphql';

describe('ProcessoMapper', () => {
  describe('mapTribunal', () => {
    it('should map $Enums.Tribunal.STF to Tribunal.STF', () => {
      expect(ProcessoMapper.mapTribunal($Enums.Tribunal.STF)).toEqual(Tribunal.STF);
    });

    it('should throw an error for unmapped tribunal', () => {
      expect(() => ProcessoMapper.mapTribunal('UFBA' as $Enums.Tribunal)).toThrow(
        'Tribunal UFBA não mapeado!',
      );
    });
  });

  describe('mapParte', () => {
    it('should map $Enums.TipoParte.ADVOGADO to TipoParte.ADVOGADO', () => {
      expect(ProcessoMapper.mapParte($Enums.TipoParte.ADVOGADO)).toEqual(TipoParte.ADVOGADO);
    });

    it('should throw an error for unmapped tipo parte', () => {
      expect(() => ProcessoMapper.mapParte('Filho' as $Enums.TipoParte)).toThrow(
        'Parte Filho não mapeada!',
      );
    });
  });

  describe('fromPrisma', () => {
    it('should correctly map ProcessoFromPrismaInput to Processo', () => {
      const mockProcessoFromPrisma: ProcessoFromPrismaInput = {
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
              tipo: TipoParte.JUIZ,
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
      };

      const result = ProcessoMapper.fromPrisma(mockProcessoFromPrisma);

      expect(result.tribunal).toEqual(Tribunal.STF);
      expect(result.partes[0].nome).toEqual('João da Silva');
      expect(result.partes[0].tipo).toEqual(TipoParte.JUIZ);
      expect(result.movimentacoes[0].descricao).toEqual('Ação protocolada');
    });
  });
});
