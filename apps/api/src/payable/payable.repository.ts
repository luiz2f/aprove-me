import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { Assignor, Payable } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { isUUID } from 'class-validator';
import { UpdatePayableDTO } from './dto/update-payable.dto';
import { Pagination } from '../Pagination';

type errorType = {
  message: string;
};

@Injectable()
export class PayableRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findByAssignorID(id: string): Promise<Assignor | errorType> {
    if (!isUUID(id, 4)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }

    const assignor = await this.databaseService.assignor.findUnique({
      where: { id },
    });

    if (!assignor) {
      throw new NotFoundException(`Assignor with ID ${id} not found`);
    }

    return assignor;
  }

  async create(data: CreatePayableDto): Promise<Payable | errorType> {
    await this.findByAssignorID(data.assignorId);

    const { assignorId, ...payableData } = data;

    return await this.databaseService.payable.create({
      data: {
        ...payableData,
        assignor: { connect: { id: assignorId } },
      },
    });
  }

  async findAll(
    params: Pagination,
  ): Promise<{ data: Payable[]; length: number }> {
    const data = await this.databaseService.payable.findMany(params);
    const length = await this.databaseService.payable.count();

    return { data, length };
  }

  async findById(id: string): Promise<Payable | errorType> {
    if (!isUUID(id, 4)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }

    const payable = await this.databaseService.payable.findUnique({
      where: { id },
    });

    if (!payable) {
      throw new NotFoundException(`Payable with ID ${id} not found`);
    }

    return payable;
  }

  async update(
    id: string,
    data: UpdatePayableDTO,
  ): Promise<Payable | errorType> {
    console.log(id, 'repo');

    if (data.assignorId) {
      await this.findByAssignorID(data.assignorId);
    }
    await this.findById(id);

    const { value, emissionDate, assignorId } = data;
    const updateData = { value, emissionDate, assignorId };

    return await this.databaseService.payable.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string): Promise<Payable | errorType> {
    await this.findById(id);

    await this.databaseService.payable.delete({
      where: { id },
    });
    return { message: `Payable with ID ${id} has been deleted successfully` };
  }
}
