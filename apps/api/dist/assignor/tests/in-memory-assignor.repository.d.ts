import { Assignor } from '@prisma/client';
import { AssignorRepository } from './assignor.repository';
export declare class InMemoryAssignorRepository implements AssignorRepository {
    assignors: Assignor[];
    create(data: Assignor): Promise<Assignor>;
    findById(id: string): Promise<Assignor>;
    findAll(): Promise<Assignor[]>;
    update(id: string, data: Partial<Assignor>): Promise<Assignor>;
    remove(id: string): Promise<void>;
}
