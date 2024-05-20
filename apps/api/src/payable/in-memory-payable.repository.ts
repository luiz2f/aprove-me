import { Payable } from '@prisma/client';
import { PayableRepository } from './payable.repository';

export class InMemoryPayableRepository implements PayableRepository {
  public payables: Payable[] = [];

  async create(data: Payable): Promise<Payable> {
    this.payables.push(data);

    return data;
  }
  async findAll(): Promise<Payable[]> {
    return this.payables;
  }

  async findById(id: string): Promise<Payable> {
    return this.payables.find((payable) => payable.id === id);
  }

  async update(id: string, data: Partial<Payable>): Promise<Payable> {
    const index = this.payables.findIndex((payable) => payable.id === id);

    this.payables[index] = Object.assign(this.payables[index], data);

    return this.payables[index];
  }

  async remove(id: string): Promise<void> {
    this.payables = this.payables.filter((payable) => payable.id !== id);
  }
}
