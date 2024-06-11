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
  UseFilters,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { AuthGuard, PassportModule } from '@nestjs/passport';
// import { HttpExceptionFilter } from 'src/http-exception.filter';

@Controller('integrations/assignor')
@UseGuards(AuthGuard('jwt'))
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorService.create(createAssignorDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.assignorService.findById(id);
  }
  @Get('list')
  findAllIds() {
    return this.assignorService.findAllIds();
  }
  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    const skip = (page - 1) * limit;
    const take = limit;
    return this.assignorService.findAll({ skip, take });
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDto,
  ) {
    return this.assignorService.update(id, updateAssignorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignorService.remove(id);
  }
}
