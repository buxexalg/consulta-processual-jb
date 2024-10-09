import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProcessoService } from './processo.service';
import { CreateProcessoInput } from './dto/create-processo.input';
import { UpdateProcessoInput } from './dto/update-processo.input';

@Resolver('Processo')
export class ProcessoResolver {
  constructor(private readonly processoService: ProcessoService) {}

  @Mutation('createProcesso')
  create(@Args('createProcessoInput') createProcessoInput: CreateProcessoInput) {
    return this.processoService.create(createProcessoInput);
  }

  @Query('processo')
  findAll() {
    return this.processoService.findAll();
  }

  @Query('processo')
  findOne(@Args('id') id: number) {
    return this.processoService.findOne(id);
  }

  @Mutation('updateProcesso')
  update(@Args('updateProcessoInput') updateProcessoInput: UpdateProcessoInput) {
    return this.processoService.update(updateProcessoInput.id, updateProcessoInput);
  }

  @Mutation('removeProcesso')
  remove(@Args('id') id: number) {
    return this.processoService.remove(id);
  }
}
