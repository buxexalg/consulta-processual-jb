import { Test, TestingModule } from '@nestjs/testing';
import { ProcessoModule } from './processo.module';
import { ProcessoService } from './processo.service';
import { ProcessoResolver } from './processo.resolver';
import { PrismaService } from '../../database/services/prisma.service';

describe('ProcessoModule', () => {
  let processoService: ProcessoService;
  let processoResolver: ProcessoResolver;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProcessoModule],
    }).compile();

    processoService = module.get<ProcessoService>(ProcessoService);
    processoResolver = module.get<ProcessoResolver>(ProcessoResolver);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(processoService).toBeDefined();
    expect(processoResolver).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
