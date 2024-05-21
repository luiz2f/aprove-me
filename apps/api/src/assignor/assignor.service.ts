import { BadRequestException, Injectable } from '@nestjs/common';

import { Assignor } from '@prisma/client';
import { AssignorRepository } from './assignor.repository';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

type errorType = {
  message: string;
};

@Injectable()
export class AssignorService {
  constructor(private readonly assignorRepository: AssignorRepository) {}

  async create(data: CreateAssignorDto): Promise<Assignor | errorType> {
    try {
      const newAssignor = await this.assignorRepository.create(data);
      return newAssignor;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Assignor[]> {
    return await this.assignorRepository.findAll();
  }

  async findById(id: string): Promise<Assignor | errorType> {
    try {
      const payable = await this.assignorRepository.findById(id);
      return payable;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async update(
    id: string,
    data: UpdateAssignorDto,
  ): Promise<Assignor | errorType> {
    try {
      const updatedAssignor = await this.assignorRepository.update(id, data);
      return updatedAssignor;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string): Promise<Assignor | errorType> {
    return await this.assignorRepository.remove(id);
  }
}
