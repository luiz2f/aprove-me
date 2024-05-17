import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDTO } from './dto/update-payable.dto';
export declare class PayableController {
    private readonly payableService;
    constructor(payableService: PayableService);
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
    findOne(id: string): Promise<string | {
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
    remove(id: string): Promise<void>;
}
