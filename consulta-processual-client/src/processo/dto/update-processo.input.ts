import { CreateProcessoInput } from './create-processo.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProcessoInput extends PartialType(CreateProcessoInput) {
  id: number;
}
