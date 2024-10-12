/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as dotenv from 'dotenv';
import {
  Tribunal,
  PrismaClient,
  TipoParte,
} from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

class CoursesSeed {
  async addProcessos() {
    const processos = [
      {
        data: new Date('2023-01-10'),
        numeroCNJ: '0000001-23.2023.1.00.0000',
        tribunal: Tribunal.STF,
        movimentacoes: [
          { dataDaMovimentacao: new Date('2023-01-15'), descricao: 'Ação protocolada' },
          { dataDaMovimentacao: new Date('2023-01-20'), descricao: 'Decisão inicial' },
        ],
        partes: [
          { nome: 'João da Silva', tipo: TipoParte.ADVOGADO, informacaoExtra: 'OAB-SP 123456' },
          { nome: 'Maria Souza', tipo: TipoParte.PARTE_ENVOLVIDA },
        ],
      },
      {
        data: new Date('2023-06-10'),
        numeroCNJ: '0000002-45.2023.1.00.0000',
        tribunal: Tribunal.STF,
        movimentacoes: [
          { dataDaMovimentacao: new Date('2023-06-12'), descricao: 'Recurso apresentado' },
          { dataDaMovimentacao: new Date('2023-06-20'), descricao: 'Julgamento do recurso' },
        ],
        partes: [
          { nome: 'Carlos Pereira', tipo: TipoParte.ADVOGADO, informacaoExtra: 'OAB-RJ 654321' },
          { nome: 'Ana Maria', tipo: TipoParte.PARTE_ENVOLVIDA },
        ],
      },
      {
        data: new Date('2022-09-14'),
        numeroCNJ: '1000003-34.2022.3.00.0000',
        tribunal: Tribunal.STJ,
        movimentacoes: [
          { dataDaMovimentacao: new Date('2022-09-18'), descricao: 'Ação movida contra o réu' },
          { dataDaMovimentacao: new Date('2022-09-25'), descricao: 'Julgamento realizado' },
        ],
        partes: [
          { nome: 'Lucas Santos', tipo: TipoParte.ADVOGADO, informacaoExtra: 'OAB-BA 456789' },
          { nome: 'Fernanda Costa', tipo: TipoParte.PARTE_ENVOLVIDA },
        ],
      },
      {
        data: new Date('2022-12-22'),
        numeroCNJ: '1000004-56.2022.3.00.0000',
        tribunal: Tribunal.STJ,
        movimentacoes: [
          { dataDaMovimentacao: new Date('2022-12-25'), descricao: 'Petição inicial' },
          { dataDaMovimentacao: new Date('2023-01-10'), descricao: 'Decisão preliminar' },
        ],
        partes: [
          { nome: 'Paulo Lima', tipo: TipoParte.ADVOGADO, informacaoExtra: 'OAB-SP 112233' },
          { nome: 'Jorge Almeida', tipo: TipoParte.PARTE_ENVOLVIDA },
        ],
      },
      {
        data: new Date('2021-11-05'),
        numeroCNJ: '2000005-78.2021.5.00.0000',
        tribunal: Tribunal.TST,
        movimentacoes: [
          { dataDaMovimentacao: new Date('2021-11-07'), descricao: 'Ação trabalhista movida' },
          { dataDaMovimentacao: new Date('2021-11-15'), descricao: 'Audiência marcada' },
        ],
        partes: [
          { nome: 'José Farias', tipo: TipoParte.ADVOGADO, informacaoExtra: 'OAB-MG 778899' },
          { nome: 'Alice Mendes', tipo: TipoParte.PARTE_ENVOLVIDA },
        ],
      },
      {
        data: new Date('2021-07-10'),
        numeroCNJ: '2000006-90.2021.5.00.0000',
        tribunal: Tribunal.TST,
        movimentacoes: [
          { dataDaMovimentacao: new Date('2021-07-12'), descricao: 'Contestação recebida' },
          { dataDaMovimentacao: new Date('2021-07-20'), descricao: 'Audiência realizada' },
        ],
        partes: [
          { nome: 'Cláudia Batista', tipo: TipoParte.ADVOGADO, informacaoExtra: 'OAB-RS 334455' },
          { nome: 'Pedro Rocha', tipo: TipoParte.PARTE_ENVOLVIDA },
        ],
      },
      {
        data: new Date('2022-03-08'),
        numeroCNJ: '3000007-12.2022.6.00.0000',
        tribunal: Tribunal.TSE,
        movimentacoes: [
          {
            dataDaMovimentacao: new Date('2022-03-10'),
            descricao: 'Recurso eleitoral apresentado',
          },
          { dataDaMovimentacao: new Date('2022-03-15'), descricao: 'Julgamento do recurso' },
        ],
        partes: [
          { nome: 'Ricardo Oliveira', tipo: TipoParte.ADVOGADO, informacaoExtra: 'OAB-ES 123789' },
          { nome: 'Sônia Carvalho', tipo: TipoParte.PARTE_ENVOLVIDA },
        ],
      },
      {
        data: new Date('2023-05-12'),
        numeroCNJ: '3000008-23.2023.6.00.0000',
        tribunal: Tribunal.TSE,
        movimentacoes: [
          { dataDaMovimentacao: new Date('2023-05-15'), descricao: 'Candidatura contestada' },
          { dataDaMovimentacao: new Date('2023-06-01'), descricao: 'Decisão sobre candidatura' },
        ],
        partes: [
          {
            nome: 'Mariana Figueiredo',
            tipo: TipoParte.ADVOGADO,
            informacaoExtra: 'OAB-PE 987123',
          },
          { nome: 'Joana Ribeiro', tipo: TipoParte.PARTE_ENVOLVIDA },
        ],
      },
      {
        data: new Date('2022-02-14'),
        numeroCNJ: '4000009-34.2022.7.00.0000',
        tribunal: Tribunal.STM,
        movimentacoes: [
          { dataDaMovimentacao: new Date('2022-02-16'), descricao: 'Ação militar proposta' },
          { dataDaMovimentacao: new Date('2022-02-20'), descricao: 'Decisão militar emitida' },
        ],
        partes: [
          { nome: 'Fábio Leite', tipo: TipoParte.ADVOGADO, informacaoExtra: 'OAB-AM 112244' },
          { nome: 'Lúcia Nogueira', tipo: TipoParte.PARTE_ENVOLVIDA },
        ],
      },
      {
        data: new Date('2023-09-08'),
        numeroCNJ: '4000010-45.2023.7.00.0000',
        tribunal: Tribunal.STM,
        movimentacoes: [
          { dataDaMovimentacao: new Date('2023-09-12'), descricao: 'Recurso militar' },
          { dataDaMovimentacao: new Date('2023-09-20'), descricao: 'Julgamento militar final' },
        ],
        partes: [
          { nome: 'Gabriel Santos', tipo: TipoParte.ADVOGADO, informacaoExtra: 'OAB-RJ 889977' },
          { nome: 'Rafael Souza', tipo: TipoParte.PARTE_ENVOLVIDA },
        ],
      },
      {
        data: new Date('2022-05-15'),
        numeroCNJ: '5001111-88.2022.8.13.0123',
        tribunal: Tribunal.TJRS,
        movimentacoes: [
          { dataDaMovimentacao: new Date('2022-05-20'), descricao: 'Audiência marcada' },
          { dataDaMovimentacao: new Date('2022-06-10'), descricao: 'Despacho de intimação' },
        ],
        partes: [
          { nome: 'Ricardo Lima', tipo: TipoParte.ADVOGADO, informacaoExtra: 'OAB-RS 789456' },
          { nome: 'João Sousa', tipo: TipoParte.PARTE_ENVOLVIDA },
        ],
      },
      {
        data: new Date('2021-04-18'),
        numeroCNJ: '2001212-55.2021.8.11.0030',
        tribunal: Tribunal.TJMT,
        movimentacoes: [
          { dataDaMovimentacao: new Date('2021-05-01'), descricao: 'Decisão de mérito' },
          { dataDaMovimentacao: new Date('2021-06-01'), descricao: 'Recurso interposto' },
        ],
        partes: [
          { nome: 'Maria Fernandes', tipo: TipoParte.PARTE_ENVOLVIDA },
          { nome: 'Carlos Souza', tipo: TipoParte.ADVOGADO, informacaoExtra: 'OAB-MT 123789' },
        ],
      },
      {
        data: new Date('2020-09-11'),
        numeroCNJ: '7001234-22.2020.8.18.0041',
        tribunal: Tribunal.TJPI,
        movimentacoes: [
          { dataDaMovimentacao: new Date('2020-09-15'), descricao: 'Início da fase instrutória' },
          { dataDaMovimentacao: new Date('2020-10-05'), descricao: 'Depoimento da parte autora' },
        ],
        partes: [
          { nome: 'Ana Claudia', tipo: TipoParte.PARTE_ENVOLVIDA },
          { nome: 'Luiz Roberto', tipo: TipoParte.JUIZ },
        ],
      },
      {
        data: new Date('2023-07-02'),
        numeroCNJ: '6004444-66.2023.8.21.0015',
        tribunal: Tribunal.TJRS,
        movimentacoes: [
          { dataDaMovimentacao: new Date('2023-07-10'), descricao: 'Decisão preliminar' },
          { dataDaMovimentacao: new Date('2023-07-20'), descricao: 'Expedição de mandado' },
        ],
        partes: [
          {
            nome: 'Escritório Advocacia Silva',
            tipo: TipoParte.ADVOGADO,
            informacaoExtra: 'OAB-RS 123456',
          },
          { nome: 'Roberto Alves', tipo: TipoParte.PARTE_ENVOLVIDA },
        ],
      },
      {
        data: new Date('2019-01-22'),
        numeroCNJ: '8005432-21.2019.8.13.0098',
        tribunal: Tribunal.TJMG,
        movimentacoes: [
          { dataDaMovimentacao: new Date('2019-01-30'), descricao: 'Citação do réu' },
          {
            dataDaMovimentacao: new Date('2019-02-10'),
            descricao: 'Decisão de primeira instância',
          },
        ],
        partes: [
          { nome: 'Luciana Pereira', tipo: TipoParte.PARTE_ENVOLVIDA },
          {
            nome: 'Escritório de Advocacia Ribeiro',
            tipo: TipoParte.ADVOGADO,
            informacaoExtra: 'OAB-MG 654789',
          },
        ],
      },
      {
        data: new Date('2022-02-12'),
        numeroCNJ: '9011231-43.2022.8.12.0001',
        tribunal: Tribunal.TJMS,
        movimentacoes: [
          { dataDaMovimentacao: new Date('2022-02-20'), descricao: 'Expedição de sentença' },
          { dataDaMovimentacao: new Date('2022-03-05'), descricao: 'Execução provisória' },
        ],
        partes: [
          { nome: 'Pedro Silva', tipo: TipoParte.PARTE_ENVOLVIDA },
          { nome: 'Jorge Santos', tipo: TipoParte.JUIZ },
        ],
      },
      {
        data: new Date('2021-11-22'),
        numeroCNJ: '3456789-21.2021.8.15.0000',
        tribunal: Tribunal.TJPB,
        movimentacoes: [
          { dataDaMovimentacao: new Date('2021-11-30'), descricao: 'Decisão interlocutória' },
          { dataDaMovimentacao: new Date('2021-12-15'), descricao: 'Apreciação do recurso' },
        ],
        partes: [
          { nome: 'Gabriela Alves', tipo: TipoParte.PARTE_ENVOLVIDA },
          { nome: 'Antonio Rocha', tipo: TipoParte.ADVOGADO, informacaoExtra: 'OAB-PB 789456' },
        ],
      },
      {
        data: new Date('2023-04-11'),
        numeroCNJ: '6000013-90.2023.8.01.0000',
        tribunal: Tribunal.TJAC,
        movimentacoes: [
          { dataDaMovimentacao: new Date('2023-04-15'), descricao: 'Processo iniciado' },
          { dataDaMovimentacao: new Date('2023-04-20'), descricao: 'Primeira audiência marcada' },
        ],
        partes: [
          { nome: 'Juliana Andrade', tipo: TipoParte.ADVOGADO, informacaoExtra: 'OAB-AC 123321' },
          { nome: 'Lucas Vieira', tipo: TipoParte.PARTE_ENVOLVIDA },
        ],
      },
      {
        data: new Date('2022-09-30'),
        numeroCNJ: '6000014-12.2022.8.01.0000',
        tribunal: Tribunal.TJAC,
        movimentacoes: [
          {
            dataDaMovimentacao: new Date('2022-10-05'),
            descricao: 'Inquérito policial finalizado',
          },
          { dataDaMovimentacao: new Date('2022-10-15'), descricao: 'Denúncia recebida pelo juiz' },
        ],
        partes: [
          { nome: 'Fernanda Gomes', tipo: TipoParte.ADVOGADO, informacaoExtra: 'OAB-AC 112233' },
          { nome: 'Eduardo Matos', tipo: TipoParte.PARTE_ENVOLVIDA },
        ],
      },
      {
        data: new Date('2021-08-18'),
        numeroCNJ: '7000015-34.2021.8.02.0000',
        tribunal: Tribunal.TJAL,
        movimentacoes: [
          { dataDaMovimentacao: new Date('2021-08-22'), descricao: 'Audiência de conciliação' },
          {
            dataDaMovimentacao: new Date('2021-09-01'),
            descricao: 'Prova testemunhal apresentada',
          },
        ],
        partes: [
          { nome: 'Rodrigo Lopes', tipo: TipoParte.ADVOGADO, informacaoExtra: 'OAB-AL 987654' },
          { nome: 'Cláudio Silva', tipo: TipoParte.PARTE_ENVOLVIDA },
        ],
      },
      {
        data: new Date('2020-12-07'),
        numeroCNJ: '7000016-56.2020.8.02.0000',
        tribunal: Tribunal.TJAL,
        movimentacoes: [
          { dataDaMovimentacao: new Date('2020-12-12'), descricao: 'Processo distribuído' },
          {
            dataDaMovimentacao: new Date('2020-12-22'),
            descricao: 'Ação de execução fiscal movida',
          },
        ],
        partes: [
          { nome: 'Patrícia Lima', tipo: TipoParte.ADVOGADO, informacaoExtra: 'OAB-AL 123456' },
          { nome: 'Rafael Souza', tipo: TipoParte.PARTE_ENVOLVIDA },
        ],
      },
      {
        data: new Date('2022-03-14'),
        numeroCNJ: '8000017-78.2022.8.04.0000',
        tribunal: Tribunal.TJAM,
        movimentacoes: [
          { dataDaMovimentacao: new Date('2022-03-18'), descricao: 'Sentença proferida' },
          { dataDaMovimentacao: new Date('2022-04-01'), descricao: 'Recurso interposto' },
        ],
        partes: [
          { nome: 'Marcelo Torres', tipo: TipoParte.ADVOGADO, informacaoExtra: 'OAB-AM 445566' },
          { nome: 'Paula Nunes', tipo: TipoParte.PARTE_ENVOLVIDA },
        ],
      },
      {
        data: new Date('2021-11-23'),
        numeroCNJ: '8000018-90.2021.8.04.0000',
        tribunal: Tribunal.TJAM,
        movimentacoes: [
          { dataDaMovimentacao: new Date('2021-11-30'), descricao: 'Processo arquivado' },
          { dataDaMovimentacao: new Date('2021-12-10'), descricao: 'Reabertura do processo' },
        ],
        partes: [
          { nome: 'Mário Costa', tipo: TipoParte.ADVOGADO, informacaoExtra: 'OAB-AM 223344' },
          { nome: 'Larissa Almeida', tipo: TipoParte.PARTE_ENVOLVIDA },
        ],
      },
      {
        data: new Date('2023-02-02'),
        numeroCNJ: '9000019-12.2023.8.03.0000',
        tribunal: Tribunal.TJAP,
        movimentacoes: [
          { dataDaMovimentacao: new Date('2023-02-07'), descricao: 'Citação do réu' },
          {
            dataDaMovimentacao: new Date('2023-02-20'),
            descricao: 'Resposta à citação apresentada',
          },
        ],
        partes: [
          { nome: 'André Figueiredo', tipo: TipoParte.ADVOGADO, informacaoExtra: 'OAB-AP 112277' },
          { nome: 'Felipe Nascimento', tipo: TipoParte.PARTE_ENVOLVIDA },
        ],
      },
      {
        data: new Date('2022-05-10'),
        numeroCNJ: '9000020-34.2022.8.03.0000',
        tribunal: Tribunal.TJAP,
        movimentacoes: [
          { dataDaMovimentacao: new Date('2022-05-15'), descricao: 'Ação de cobrança' },
          {
            dataDaMovimentacao: new Date('2022-06-01'),
            descricao: 'Decisão interlocutória proferida',
          },
        ],
        partes: [
          { nome: 'Roberta Fernandes', tipo: TipoParte.ADVOGADO, informacaoExtra: 'OAB-AP 334455' },
          { nome: 'Bruno Dias', tipo: TipoParte.PARTE_ENVOLVIDA },
        ],
      },
    ];

    for (const processo of processos) {
      await prisma.processo.create({
        data: {
          data: processo.data,
          numeroCNJ: processo.numeroCNJ,
          tribunal: processo.tribunal,
          movimentacoes: {
            createMany: {
              data: processo.movimentacoes.map((mov) => ({
                dataDaMovimentacao: mov.dataDaMovimentacao,
                descricao: mov.descricao,
              })),
            },
          },
          partes: {
            create: processo.partes.map((parte) => ({
              parte: {
                create: {
                  nome: parte.nome,
                  tipo: parte.tipo,
                  informacaoExtra: parte.informacaoExtra || '',
                },
              },
            })),
          },
        },
      });
    }
  }

  async run() {
    await this.addProcessos();
  }
}

const seed = new CoursesSeed();

seed
  .run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
