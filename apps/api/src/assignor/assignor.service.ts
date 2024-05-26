import { BadRequestException, Injectable } from '@nestjs/common';

import { Assignor } from '@prisma/client';
import { AssignorRepository } from './assignor.repository';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

@Injectable()
export class AssignorService {
  constructor(private readonly assignorRepository: AssignorRepository) {}

  async create(
    data: CreateAssignorDto,
  ): Promise<Assignor | { message: string }> {
    try {
      return await this.assignorRepository.create(data);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('An unexpected error occurred');
    }
  }

  async findAll(): Promise<Assignor[]> {
    return await this.assignorRepository.findAll();
  }

  async findById(id: string): Promise<Assignor | { message: string }> {
    try {
      return await this.assignorRepository.findById(id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('An unexpected error occurred');
    }
  }
  async update(
    id: string,
    data: UpdateAssignorDto,
  ): Promise<Assignor | { message: string }> {
    try {
      return await this.assignorRepository.update(id, data);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('An unexpected error occurred');
    }
  }

  async remove(id: string): Promise<Assignor | { message: string }> {
    return await this.assignorRepository.remove(id);
  }
}
