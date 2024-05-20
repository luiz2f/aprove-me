import { PartialType } from '@nestjs/mapped-types';
import { CreatePayableDto } from './create-payable.dto';

export class UpdatePayableDTO extends PartialType(CreatePayableDto) {}
