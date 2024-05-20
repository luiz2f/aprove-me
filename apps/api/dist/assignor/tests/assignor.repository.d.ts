import { Assignor } from '@prisma/client';
export declare abstract class AssignorRepository {
    abstract create(data: Assignor): Promise<Assignor>;
    abstract findAll(): Promise<Assignor[]>;
    abstract findById(id: string): Promise<Assignor | null>;
    abstract update(id: string, data: Partial<Assignor>): Promise<Assignor>;
    abstract remove(id: string): Promise<void>;
}
