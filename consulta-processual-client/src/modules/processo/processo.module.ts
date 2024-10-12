import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/services/prisma.service';
import { ProcessoResolver } from './processo.resolver';
import { ProcessoService } from './processo.service';

@Module({
  providers: [ProcessoResolver, ProcessoService, PrismaService],
})
export class ProcessoModule {}
