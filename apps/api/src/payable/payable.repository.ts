import { Payable } from '@prisma/client';

export abstract class PayableRepository {
  abstract create(data: Payable): Promise<Payable>;
  abstract findAll(): Promise<Payable[]>;
  abstract findById(id: string): Promise<Payable | null>;
  abstract update(id: string, data: Partial<Payable>): Promise<Payable>;
  abstract remove(id: string): Promise<void>;
}
