import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { DatabaseService } from '../database/database.service';
import { Assignor } from '@prisma/client';
import { Pagination } from 'src/Pagination';
export declare class AssignorRepository {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create({ document, email, name, phone, }: CreateAssignorDto): Promise<Assignor | {
        message: string;
    }>;
    findAll(params: Pagination): Promise<{
        data: Assignor[];
        length: number;
    }>;
    findAllIds(): Promise<string[]>;
    findById(id: string): Promise<Assignor | {
        message: string;
    }>;
    update(id: string, data: UpdateAssignorDto): Promise<Assignor>;
    remove(id: string): Promise<Assignor | {
        message: string;
    }>;
}
