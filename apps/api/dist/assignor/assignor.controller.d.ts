import { AssignorService } from './assignor.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
export declare class AssignorController {
    private readonly assignorService;
    constructor(assignorService: AssignorService);
    create(createAssignorDto: CreateAssignorDto): Promise<{
        id: string;
        document: string;
        email: string;
        phone: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        message: string;
    }>;
    findAll(page?: number, limit?: number): Promise<void | {
        data: {
            id: string;
            document: string;
            email: string;
            phone: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        length: number;
    }>;
    findAllIds(): Promise<string[]>;
    findById(id: string): Promise<{
        id: string;
        document: string;
        email: string;
        phone: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        message: string;
    }>;
    update(id: string, updateAssignorDto: UpdateAssignorDto): Promise<{
        id: string;
        document: string;
        email: string;
        phone: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        message: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        document: string;
        email: string;
        phone: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        message: string;
    }>;
}
