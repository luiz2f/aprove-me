import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { DatabaseService } from '../database/database.service';
export declare class AssignorService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(createAssignorDto: CreateAssignorDto): Promise<CreateAssignorDto>;
    findAll(): Promise<{
        id: string;
        document: string;
        email: string;
        phone: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        document: string;
        email: string;
        phone: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateAssignorDto: UpdateAssignorDto): Promise<{
        id: string;
        document: string;
        email: string;
        phone: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
