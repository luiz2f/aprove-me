import { CreatePayableDto } from './dto/create-payable.dto';
import { Assignor, Payable } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UpdatePayableDTO } from './dto/update-payable.dto';
type errorType = {
    message: string;
};
export declare class PayableRepository {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    findByAssignorID(id: string): Promise<Assignor | errorType>;
    create(data: CreatePayableDto): Promise<Payable | errorType>;
    findAll(): Promise<Payable[]>;
    findById(id: string): Promise<Payable | errorType>;
    update(id: string, data: UpdatePayableDTO): Promise<Payable | errorType>;
    remove(id: string): Promise<Payable | errorType>;
}
export {};
