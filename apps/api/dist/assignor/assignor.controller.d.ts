import { AssignorService } from './assignor.service';
import { Prisma } from '@prisma/client';
import { CreateAssignorDto } from './dto/create-assignor.dto';
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
    }>;
    findAll(): Promise<{
        id: string;
        document: string;
        email: string;
        phone: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        document: string;
        email: string;
        phone: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateAssignorDto: Prisma.AssignorUpdateInput): Promise<{
        id: string;
        document: string;
        email: string;
        phone: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        document: string;
        email: string;
        phone: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
