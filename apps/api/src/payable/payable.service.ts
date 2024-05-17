import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDTO } from './dto/update-payable.dto';
import { validate } from 'class-validator';

@Injectable()
export class PayableService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPayableDto: CreatePayableDto) {
    return this.databaseService.payable.create({ data: createPayableDto });
  }

  async findAll() {
    return this.databaseService.payable.findMany({});
  }

  async findOne(id: string) {
    const payable = await this.databaseService.payable.findUnique({
      where: { id },
    });

    if (!payable) {
      return `Playable with ID ${id} not found`;
    }

    return payable;
  }
  async update(id: string, updatePayableDto: UpdatePayableDTO) {
    // Verifica se o payable com o ID fornecido existe
    const existingPayable = await this.databaseService.payable.findUnique({
      where: { id },
    });

    if (!existingPayable) {
      throw new BadRequestException(`Payable with ID ${id} not found`);
    }

    // Aplica as validações no DTO
    const errors = await validate(updatePayableDto);

    if (errors.length > 0) {
      throw new BadRequestException(errors.toString());
    }

    // Atualiza apenas os campos fornecidos
    const dataToUpdate: Partial<UpdatePayableDTO> = {};
    if (updatePayableDto.value !== undefined)
      dataToUpdate.value = updatePayableDto.value;
    if (updatePayableDto.emissionDate !== undefined)
      dataToUpdate.emissionDate = updatePayableDto.emissionDate;
    if (updatePayableDto.assignorId !== undefined)
      dataToUpdate.assignorId = updatePayableDto.assignorId;

    // Removemos a atribuição do id, garantindo que ele não seja atualizado
    // dataToUpdate.id = id; // Remove this line
    const forbiddenAttributes = ['id', 'createdAt', 'updatedAt'];
    const invalidAttributes = Object.keys(updatePayableDto).filter((attr) =>
      forbiddenAttributes.includes(attr),
    );
    if (invalidAttributes.length > 0) {
      throw new BadRequestException(
        `You can't change these attributes: ${invalidAttributes.join(', ')}`,
      );
    }
    // Executa a atualização no banco de dados
    return this.databaseService.payable.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: string) {
    const payableToDelete = await this.databaseService.payable.findUnique({
      where: { id },
    });

    if (!payableToDelete) {
      throw new BadRequestException(`Playable with ID ${id} not found`);
    }

    await this.databaseService.payable.delete({
      where: { id },
    });

    throw new BadRequestException(`Playable with ID ${id} deleted`);
  }
}
