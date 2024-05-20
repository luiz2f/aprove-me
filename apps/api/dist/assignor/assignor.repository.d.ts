import { Assignor } from '@prisma/client';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { DatabaseService } from 'src/database/database.service';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
export declare class AssignorRepository {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(createAssignorDto: CreateAssignorDto): Promise<Assignor>;
    findAll(): Promise<Assignor[]>;
    findById(id: string): Promise<Assignor | null>;
    update(id: string, updateAssignorDto: UpdateAssignorDto): Promise<Assignor>;
    remove(id: string): Promise<Assignor>;
}
