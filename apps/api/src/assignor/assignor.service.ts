import { Injectable } from '@nestjs/common';

import { Assignor } from '@prisma/client';
import { AssignorRepository } from './assignor.repository';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { Pagination } from '../Pagination';

@Injectable()
export class AssignorService {
  constructor(private readonly assignorRepository: AssignorRepository) {}

  async create(
    data: CreateAssignorDto,
  ): Promise<Assignor | { message: string }> {
    try {
      return await this.assignorRepository.create(data);
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    params: Pagination,
  ): Promise<{ data: Assignor[]; length: number } | void> {
    return await this.assignorRepository.findAll(params);
  }
  async findAllIds(): Promise<string[]> {
    return await this.assignorRepository.findAllIds();
  }

  async findById(id: string): Promise<Assignor | { message: string }> {
    try {
      return await this.assignorRepository.findById(id);
    } catch (error) {
      throw error;
    }
  }
  async update(
    id: string,
    data: UpdateAssignorDto,
  ): Promise<Assignor | { message: string }> {
    try {
      return await this.assignorRepository.update(id, data);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<Assignor | { message: string }> {
    return await this.assignorRepository.remove(id);
  }
}
