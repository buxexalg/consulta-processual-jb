import { Module } from '@nestjs/common';
import { ProcessoService } from './processo.service';
import { ProcessoResolver } from './processo.resolver';

@Module({
  providers: [ProcessoResolver, ProcessoService],
})
export class ProcessoModule {}
