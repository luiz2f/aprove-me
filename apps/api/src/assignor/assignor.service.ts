import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { isUUID } from 'class-validator';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AssignorService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(
    createAssignorDto: CreateAssignorDto,
  ): Promise<CreateAssignorDto> {
    const errors = [];
    const { document, email } = createAssignorDto;

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
      return await this.databaseService.assignor.create({
        data: createAssignorDto,
      });
    } catch (error) {
      // Lança uma exceção com todas as mensagens de erro combinadas
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return await this.databaseService.assignor.findMany();
  }

  async findById(id: string) {
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

  async update(id: string, updateAssignorDto: UpdateAssignorDto) {
    //check UUID and if exists
    await this.findById(id);
    const errors = [];
    const { document, email } = updateAssignorDto;

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

    const forbiddenAttributes = ['id', 'createdAt', 'updatedAt'];
    const invalidAttributes = Object.keys(updateAssignorDto).filter((attr) =>
      forbiddenAttributes.includes(attr),
    );
    if (invalidAttributes.length > 0) {
      throw new BadRequestException(
        `You can't change these attributes: ${invalidAttributes.join(', ')}`,
      );
    }
    try {
      return await this.databaseService.assignor.update({
        where: { id },
        data: updateAssignorDto, // Pass the object in the correct format
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    //check UUID and if exists
    await this.findById(id);

    await this.databaseService.assignor.delete({
      where: { id },
    });

    return { message: `Assignor with ID ${id} has been deleted successfully` };
  }
}
