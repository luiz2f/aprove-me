import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
export declare class AssignorService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(createAssignorDto: Prisma.AssignorCreateInput): Promise<{
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
