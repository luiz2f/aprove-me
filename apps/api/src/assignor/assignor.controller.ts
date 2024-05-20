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
import { AssignorService } from './assignor.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

@Controller('integrations/assignor')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorService.create(createAssignorDto);
  }

  @Get()
  findAll() {
    return this.assignorService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.assignorService.findById(id);
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
