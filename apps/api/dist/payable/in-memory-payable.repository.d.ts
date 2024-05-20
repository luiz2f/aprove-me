import { Payable } from '@prisma/client';
import { PayableRepository } from './payable.repository';
export declare class InMemoryPayableRepository implements PayableRepository {
    payables: Payable[];
    create(data: Payable): Promise<Payable>;
    findAll(): Promise<Payable[]>;
    findById(id: string): Promise<Payable>;
    update(id: string, data: Partial<Payable>): Promise<Payable>;
    remove(id: string): Promise<void>;
}
