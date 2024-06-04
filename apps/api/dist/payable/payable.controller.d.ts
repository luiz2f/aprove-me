import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDTO } from './dto/update-payable.dto';
export declare class PayableController {
    private readonly payableService;
    constructor(payableService: PayableService);
    create(createPayableDto: CreatePayableDto): Promise<{
        message: string;
    } | {
        id: string;
        value: number;
        emissionDate: Date;
        assignorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(page?: number, limit?: number): Promise<void | {
        data: {
            id: string;
            value: number;
            emissionDate: Date;
            assignorId: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        length: number;
    }>;
    findById(id: string): Promise<{
        message: string;
    } | {
        id: string;
        value: number;
        emissionDate: Date;
        assignorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updatePayableDto: UpdatePayableDTO): Promise<{
        message: string;
    } | {
        id: string;
        value: number;
        emissionDate: Date;
        assignorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    } | {
        id: string;
        value: number;
        emissionDate: Date;
        assignorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
