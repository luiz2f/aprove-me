import { DatabaseService } from 'src/database/database.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDTO } from './dto/update-payable.dto';
export declare class PayableService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(createPayableDto: CreatePayableDto): Promise<{
        id: string;
        value: number;
        emissionDate: Date;
        assignorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        value: number;
        emissionDate: Date;
        assignorId: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        value: number;
        emissionDate: Date;
        assignorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updatePayableDto: UpdatePayableDTO): Promise<{
        id: string;
        value: number;
        emissionDate: Date;
        assignorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
