import { Test, TestingModule } from '@nestjs/testing';
import { ProcessoResolver } from './processo.resolver';
import { ProcessoService } from './processo.service';

describe('ProcessoResolver', () => {
  let resolver: ProcessoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessoResolver, ProcessoService],
    }).compile();

    resolver = module.get<ProcessoResolver>(ProcessoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
