/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as dotenv from 'dotenv';
import {
  movimentacao,
  parte,
  processo,
  parteNoProcesso,
  Tribunal,
  PrismaClient,
  TipoParte,
} from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

class CoursesSeed {
  async addProcessos() {
    await prisma.processo.create({
      data: {
        data: new Date('2020-01-15'),
        numeroCNJ: '5001682-88.2020.8.13.0672',
        tribunal: Tribunal.TJSP,
        movimentacoes: {
          createMany: {
            data: [
              {
                dataDaMovimentacao: new Date('2020-01-20'),
                descricao: 'Distribuído para a Vara de Execuções Fiscais',
              },
              {
                dataDaMovimentacao: new Date('2020-02-05'),
                descricao: 'Audiência agendada para o dia 10/02/2020',
              },
            ],
          },
        },
        partes: {
          create: [
            {
              parte: {
                create: {
                  nome: 'João da Silva',
                  tipo: TipoParte.ADVOGADO,
                  informacaoExtra: 'OAB-SP 123456',
                },
              },
            },
            {
              parte: {
                create: {
                  nome: 'Maria Souza',
                  tipo: TipoParte.PARTE_ENVOLVIDA,
                },
              },
            },
          ],
        },
      },
    });

    await prisma.processo.create({
      data: {
        data: new Date('2021-03-22'),
        numeroCNJ: '0012345-67.2021.8.26.0000',
        tribunal: Tribunal.TJBA,
        movimentacoes: {
          createMany: {
            data: [
              {
                dataDaMovimentacao: new Date('2021-03-25'),
                descricao: 'Petição inicial protocolada',
              },
              {
                dataDaMovimentacao: new Date('2021-04-10'),
                descricao: 'Resposta do réu recebida',
              },
            ],
          },
        },
        partes: {
          create: [
            {
              parte: {
                create: {
                  nome: 'Carlos Pereira',
                  tipo: TipoParte.ADVOGADO,
                  informacaoExtra: 'OAB-BA 654321',
                },
              },
            },
            {
              parte: {
                create: {
                  nome: 'Ana Maria',
                  tipo: TipoParte.PARTE_ENVOLVIDA,
                },
              },
            },
          ],
        },
      },
    });

    await prisma.processo.create({
      data: {
        data: new Date('2019-05-10'),
        numeroCNJ: '2009876-54.2019.8.40.0001',
        tribunal: Tribunal.TJAM,
        movimentacoes: {
          createMany: {
            data: [
              {
                dataDaMovimentacao: new Date('2019-05-12'),
                descricao: 'Decisão de primeira instância',
              },
              {
                dataDaMovimentacao: new Date('2019-06-01'),
                descricao: 'Recurso interposto',
              },
            ],
          },
        },
        partes: {
          create: [
            {
              parte: {
                create: {
                  nome: 'Roberto Alves',
                  tipo: TipoParte.PARTE_ENVOLVIDA,
                },
              },
            },
            {
              parte: {
                create: {
                  nome: 'Fernanda Lima',
                  tipo: TipoParte.JUIZ,
                },
              },
            },
          ],
        },
      },
    });

    await prisma.processo.create({
      data: {
        data: new Date('2023-03-10'),
        numeroCNJ: '3456789-12.2023.8.26.0000',
        tribunal: Tribunal.TJSP,
        movimentacoes: {
          createMany: {
            data: [
              {
                dataDaMovimentacao: new Date('2020-01-20'),
                descricao: 'Distribuído para a Vara de Execuções Fiscais',
              },
              {
                dataDaMovimentacao: new Date('2020-02-05'),
                descricao: 'Audiência agendada para o dia 10/02/2020',
              },
            ],
          },
        },
        partes: {
          create: [
            {
              parte: {
                create: {
                  nome: 'Escritório de Advocacia Silva & Associados',
                  tipo: TipoParte.PARTE_ENVOLVIDA,
                  informacaoExtra: 'Exequente',
                },
              },
            },
            {
              parte: {
                create: {
                  nome: 'Souza & Souza Importadora',
                  tipo: TipoParte.PARTE_ENVOLVIDA,
                  informacaoExtra: 'Apelante',
                },
              },
            },
            {
              parte: {
                create: {
                  nome: 'Ana Santos',
                  tipo: TipoParte.ADVOGADO,
                  informacaoExtra: 'OAB-SP 345678',
                },
              },
            },
          ],
        },
      },
    });
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
