import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProcessoService } from './processo.service';
import { Processo, Tribunal } from 'src/graphql';
import { Inject } from '@nestjs/common';

@Resolver('Processo')
export class ProcessoResolver {
  constructor(@Inject(ProcessoService) private readonly processoService: ProcessoService) {}

  @Query('buscarProcessosPorTribunal')
  async buscarProcessosPorTribunal(
    @Args('tribunal', { type: () => Tribunal, nullable: false }) tribunal: Tribunal,
  ): Promise<Processo[]> {
    return this.processoService.buscarProcessosPorTribunal(tribunal);
  }

  @Query('buscarProcessoPorCNJ')
  async buscarProcessoPorCNJ(
    @Args('numeroCNJ', { type: () => String, nullable: false }) numeroCNJ: string,
  ): Promise<Processo> {
    return this.processoService.buscarProcessoPorCNJ(numeroCNJ);
  }
}
