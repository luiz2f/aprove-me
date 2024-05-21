import { Assignor } from '@prisma/client';
export declare abstract class AssignorRepository {
    abstract findById(id: string): Promise<Assignor | null>;
    abstract findAll(): Promise<Assignor[]>;
    abstract create(data: Assignor): Promise<Assignor>;
    abstract remove(id: string): Promise<void>;
    abstract update(id: string, data: Partial<Assignor>): Promise<Assignor>;
}
