import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDTO } from './dto/update-payable.dto';
import { isUUID, validate } from 'class-validator';

@Injectable()
export class PayableService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPayableDto: CreatePayableDto) {
    // Maybe check for duplicated value and emission date
    const existingAssignor = await this.databaseService.assignor.findUnique({
      where: { id: createPayableDto.assignorId },
    });
    if (!existingAssignor) {
      throw new BadRequestException(
        `Assignor with ID ${createPayableDto.assignorId} does not exist`,
      );
    }

    return await this.databaseService.payable.create({
      data: createPayableDto,
    });
  }

  async findAll() {
    return await this.databaseService.payable.findMany({});
  }

  async findById(id: string) {
    if (!isUUID(id, 4)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }

    const payable = await this.databaseService.payable.findUnique({
      where: { id },
    });

    if (!payable) {
      throw new BadRequestException(`Payable with ID ${id} not found`);
    }

    return payable;
  }
  async update(id: string, updatePayableDto: UpdatePayableDTO) {
    //check UUID and if exists
    await this.findById(id);

    // Aplica as validações no DTO
    const errors = await validate(updatePayableDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors.toString());
    }

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

    try {
      // Executa a atualização no banco de dados
      return await this.databaseService.payable.update({
        where: { id },
        data: updatePayableDto,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    //check UUID and if exists

    await this.findById(id);

    await this.databaseService.payable.delete({
      where: { id },
    });

    return { message: `Payable with ID ${id} has been deleted successfully` };
  }
}
