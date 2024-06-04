import { Assignor } from '@prisma/client';
import { AssignorRepository } from './assignor.repository';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { Pagination } from '../Pagination';
export declare class AssignorService {
    private readonly assignorRepository;
    constructor(assignorRepository: AssignorRepository);
    create(data: CreateAssignorDto): Promise<Assignor | {
        message: string;
    }>;
    findAll(params: Pagination): Promise<{
        data: Assignor[];
        length: number;
    } | void>;
    findAllIds(): Promise<string[]>;
    findById(id: string): Promise<Assignor | {
        message: string;
    }>;
    update(id: string, data: UpdateAssignorDto): Promise<Assignor | {
        message: string;
    }>;
    remove(id: string): Promise<Assignor | {
        message: string;
    }>;
}
