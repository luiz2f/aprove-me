import { Assignor } from '@prisma/client';
import { AssignorRepository } from './assignor.repository';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
type errorType = {
    message: string;
};
export declare class AssignorService {
    private readonly assignorRepository;
    constructor(assignorRepository: AssignorRepository);
    create(data: CreateAssignorDto): Promise<Assignor | errorType>;
    findAll(): Promise<Assignor[]>;
    findById(id: string): Promise<Assignor | errorType>;
    update(id: string, data: UpdateAssignorDto): Promise<Assignor | errorType>;
    remove(id: string): Promise<Assignor | errorType>;
}
export {};
