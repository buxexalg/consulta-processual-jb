import { Module } from '@nestjs/common';
import { ProcessoService } from './processo.service';
import { ProcessoResolver } from './processo.resolver';
import { PrismaService } from 'src/database/services/prisma.service';

@Module({
  providers: [ProcessoResolver, ProcessoService, PrismaService],
})
export class ProcessoModule {}
