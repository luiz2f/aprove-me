import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDTO } from './dto/update-payable.dto';
import { PayableRepository } from './payable.repository';
import { Payable } from '@prisma/client';
import { Pagination } from '../Pagination';
type errorType = {
    message: string;
};
export declare class PayableService {
    private readonly payableRepository;
    constructor(payableRepository: PayableRepository);
    create(data: CreatePayableDto): Promise<Payable | errorType>;
    findAll(params: Pagination): Promise<{
        data: Payable[];
        length: number;
    } | void>;
    findById(id: string): Promise<Payable | errorType>;
    update(id: string, data: UpdatePayableDTO): Promise<Payable | errorType>;
    remove(id: string): Promise<Payable | errorType>;
}
export {};
