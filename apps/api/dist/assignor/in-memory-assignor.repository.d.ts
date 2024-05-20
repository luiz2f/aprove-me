import { Assignor } from '@prisma/client';
import { AssignorRepository } from './tests/assignor.repository';
export declare class InMemoryAssignorRepository implements AssignorRepository {
    assignors: Assignor[];
    create(data: Assignor): Promise<Assignor>;
    findAll(): Promise<Assignor[]>;
    findById(id: string): Promise<Assignor>;
    update(id: string, data: Partial<Assignor>): Promise<Assignor>;
    remove(id: string): Promise<void>;
}
