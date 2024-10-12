import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { Processo, TipoParte, Tribunal } from '../src/graphql';

const processos: Processo[] = [
  {
    id: 1,
    data: new Date('2023-01-10'),
    numeroCNJ: '0000001-23.2023.1.00.0000',
    tribunal: Tribunal.STF,
    movimentacoes: [
      {
        id: 7,
        dataDaMovimentacao: new Date('2023-01-15'),
        descricao: 'Ação protocolada',
      },
      {
        id: 8,
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

const gql = '/graphql';

describe('GraphQL AppResolver (e2e) {Supertest}', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe(gql, () => {
    describe('buscarProcessoPorCNJ', () => {
      const buscarProcessoPorCNJQuery = `query buscarProcessoPorCNJ($numeroCNJ: String!) {
        buscarProcessoPorCNJ(numeroCNJ: $numeroCNJ) {
          id
          numeroCNJ
          tribunal
          data
          movimentacoes {
            id
            dataDaMovimentacao
            descricao
          }
          partes {
            id
            nome
            tipo
            informacaoExtra
          }
        }
      }`;
      it('should get the processos array', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: buscarProcessoPorCNJQuery,
            numeroCNJ: '0000001-23.2023.1.00.0000',
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.buscarProcessoPorCNJ).toEqual(processos);
          });
      });
      it('should return an empty processos array', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: buscarProcessoPorCNJQuery,
            numeroCNJ: '0000001-23.2023.1.00.0001',
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.buscarProcessoPorCNJ).toEqual([]);
          });
      });
    });

    describe('buscarProcessoPorCNJ', () => {
      const buscarProcessoPorCNJQuery = `query buscarProcessoPorCNJ($numeroCNJ: String!) {
        buscarProcessoPorCNJ(numeroCNJ: $numeroCNJ) {
          id
          numeroCNJ
          tribunal
          data
          movimentacoes {
            id
            dataDaMovimentacao
            descricao
          }
          partes {
            id
            nome
            tipo
            informacaoExtra
          }
        }
      }`;
      it('should get the processos array', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: buscarProcessoPorCNJQuery,
            variables: {
              numeroCNJ: '0000001-23.2023.1.00.0000',
            },
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.buscarProcessoPorCNJ).toEqual(processos);
          });
      });
      it('should return an empty processos array', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: buscarProcessoPorCNJQuery,
            variables: {
              numeroCNJ: '0000001-23.2023.1.00.0001',
            },
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.buscarProcessoPorCNJ).toEqual([]);
          });
      });
    });

    describe('buscarProcessosPorTribunal', () => {
      const buscarProcessosPorTribunalQuery = `query buscarProcessosPorTribunal($tribunal: Tribunal!) {
    buscarProcessosPorTribunal(tribunal: $tribunal) {
      id
      numeroCNJ
      tribunal
      data
      movimentacoes {
        id
        dataDaMovimentacao
        descricao
      }
      partes {
        id
        nome
        tipo
        informacaoExtra
      }
    }
  }`;
      it('should get the processos array', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: buscarProcessosPorTribunalQuery,
            variables: {
              tribunal: Tribunal.STF,
            },
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.buscarProcessoPorCNJ).toEqual(processos);
          });
      });
      it('should return an empty processos array', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: buscarProcessosPorTribunalQuery,
            variables: {
              tribunal: Tribunal.CNJ,
            },
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.buscarProcessoPorCNJ).toEqual([]);
          });
      });
    });
  });
});
