import { Injectable } from '@nestjs/common';
import { CreateProcessoInput } from './dto/create-processo.input';
import { UpdateProcessoInput } from './dto/update-processo.input';

@Injectable()
export class ProcessoService {
  create(createProcessoInput: CreateProcessoInput) {
    return 'This action adds a new processo';
  }

  findAll() {
    return `This action returns all processo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} processo`;
  }

  update(id: number, updateProcessoInput: UpdateProcessoInput) {
    return `This action updates a #${id} processo`;
  }

  remove(id: number) {
    return `This action removes a #${id} processo`;
  }
}
