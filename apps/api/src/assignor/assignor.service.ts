import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AssignorService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createAssignorDto: Prisma.AssignorCreateInput) {
    return this.databaseService.assignor.create({ data: createAssignorDto });
  }

  async findAll() {
    return this.databaseService.assignor.findMany({});
  }

  async findOne(id: string) {
    return this.databaseService.assignor.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateAssignorDto: Prisma.AssignorUpdateInput) {
    return this.databaseService.assignor.update({
      where: {
        id,
      },
      data: updateAssignorDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.assignor.delete({
      where: { id },
    });
  }
}
