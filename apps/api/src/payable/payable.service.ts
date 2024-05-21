import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDTO } from './dto/update-payable.dto';
import { PayableRepository } from './payable.repository';
import { Payable } from '@prisma/client';

type errorType = {
  message: string;
};

@Injectable()
export class PayableService {
  constructor(private readonly payableRepository: PayableRepository) {}

  async create(data: CreatePayableDto): Promise<Payable | errorType> {
    try {
      const newPayable = await this.payableRepository.create(data);
      return newPayable;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Payable[]> {
    return await this.payableRepository.findAll();
  }

  async findById(id: string): Promise<Payable | errorType> {
    try {
      const payable = await this.payableRepository.findById(id);
      return payable;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async update(
    id: string,
    data: UpdatePayableDTO,
  ): Promise<Payable | errorType> {
    console.log(id, 'service');
    try {
      const updatedPayable = await this.payableRepository.update(id, data);
      return updatedPayable;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string): Promise<Payable | errorType> {
    //check UUID and if exists
    return await this.payableRepository.remove(id);
  }
}
