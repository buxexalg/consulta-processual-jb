import { Test, TestingModule } from '@nestjs/testing';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { AppModule } from './app.module';
import { ProcessoService } from './modules/processo/processo.service';
import { ProcessoResolver } from './modules/processo/processo.resolver';
import { PrismaService } from './database/services/prisma.service';

describe('AppModule', () => {
  let appModule: TestingModule;

  beforeEach(async () => {
    appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should compile the module', async () => {
    expect(appModule).toBeDefined();
  });

  it('should load the GraphqlModule with ApolloDriver', async () => {
    const gqlModule = appModule.get<GraphQLModule>(GraphQLModule);
    expect(gqlModule).toBeDefined();

    const apolloDriver = gqlModule['options'].driver;
    expect(apolloDriver).toBe(ApolloDriver);
  });

  it('should load the ProcessoModule', () => {
    const processoService = appModule.get<ProcessoService>(ProcessoService);
    const processoResolver = appModule.get<ProcessoResolver>(ProcessoResolver);

    expect(processoService).toBeDefined();
    expect(processoResolver).toBeDefined();
  });

  it('should load PrismaService', () => {
    const prismaService = appModule.get<PrismaService>(PrismaService);
    expect(prismaService).toBeDefined();
  });
});
