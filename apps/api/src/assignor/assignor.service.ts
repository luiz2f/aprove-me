import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { isUUID } from 'class-validator';
import { DatabaseService } from '../database/database.service';
import { Assignor } from '@prisma/client';

@Injectable()
export class AssignorService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create({
    document,
    email,
    name,
    phone,
  }: CreateAssignorDto): Promise<Assignor | { message: string }> {
    const errors = [];

    if (!cpf.isValid(document) && !cnpj.isValid(document)) {
      throw new BadRequestException(`${document} is not a valid document`);
    }

    const emailAlreadyExist = await this.databaseService.assignor.findUnique({
      where: { email },
    });
    const documentAlreadyExist = await this.databaseService.assignor.findUnique(
      {
        where: { document },
      },
    );

    if (emailAlreadyExist) {
      errors.push('Email is already in use');
    }
    if (documentAlreadyExist) {
      errors.push('Document is already in use');
    }

    if (Object.keys(errors).length > 0) {
      throw new BadRequestException(errors);
    }

    try {
      const assignor = await this.databaseService.assignor.create({
        data: {
          document,
          email,
          name,
          phone,
        },
      });
      return assignor;
    } catch (error) {
      // Lança uma exceção com todas as mensagens de erro combinadas
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Assignor[]> {
    const assignors = await this.databaseService.assignor.findMany();

    return assignors;
  }

  async findById(id: string): Promise<Assignor | { message: string }> {
    if (!isUUID(id, 4)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }

    const assignor = await this.databaseService.assignor.findUnique({
      where: { id },
    });

    if (!assignor) {
      throw new BadRequestException(`Assignor with ID ${id} not found`);
    }

    return assignor;
  }

  async update(id: string, data: UpdateAssignorDto): Promise<Assignor> {
    //check UUID and if exists
    await this.findById(id);
    //pushes accumulated errors
    const errors = [];
    const { document, email, phone, name } = data;

    if (document) {
      if (!cpf.isValid(document) && !cnpj.isValid(document)) {
        throw new BadRequestException(`${document} is not a valid document`);
      }
      const documentAlreadyExist =
        await this.databaseService.assignor.findUnique({
          where: { document },
        });
      if (documentAlreadyExist) {
        errors.push('Document is already in use');
      }
    }

    if (email) {
      const emailAlreadyExist = await this.databaseService.assignor.findUnique({
        where: { email },
      });
      if (emailAlreadyExist) {
        errors.push('Email is already in use');
      }
    }

    if (errors.length > 0) {
      throw new BadRequestException(errors.join(', '));
    }
    const updateData = { document, email, phone, name };

    try {
      return await this.databaseService.assignor.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string): Promise<Assignor | { message: string }> {
    //check UUID and if exists
    await this.findById(id);

    await this.databaseService.assignor.delete({
      where: { id },
    });

    return { message: `Assignor with ID ${id} has been deleted successfully` };
  }
}
