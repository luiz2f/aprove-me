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
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDTO } from './dto/update-payable.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('integrations/payable')
@UseGuards(AuthGuard('jwt'))
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createPayableDto: CreatePayableDto) {
    const createdPayable = this.payableService.create(createPayableDto);

    return createdPayable;
  }

  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    const skip = (page - 1) * limit;
    const take = limit;
    return this.payableService.findAll({ skip, take });
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.payableService.findById(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updatePayableDto: UpdatePayableDTO) {
    return this.payableService.update(id, updatePayableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payableService.remove(id);
  }
}
