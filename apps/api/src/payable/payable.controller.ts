import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import { Prisma } from '@prisma/client';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDTO } from './dto/update-payable.dto';

@Controller('integrations/payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createPayableDto: CreatePayableDto) {
    const createdPayable = this.payableService.create(createPayableDto);

    return createdPayable;
  }
  @Get()
  findAll() {
    return this.payableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payableService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayableDto: UpdatePayableDTO) {
    return this.payableService.update(id, updatePayableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payableService.remove(id);
  }
}
