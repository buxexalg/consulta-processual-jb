import { Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Processo, Tribunal } from '../../graphql';
import { ProcessoService } from './processo.service';

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
