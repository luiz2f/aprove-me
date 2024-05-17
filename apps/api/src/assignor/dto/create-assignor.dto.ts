// src/integrations/dtos/create-assignor.dto.ts
import { IsNotEmpty, IsString, MaxLength, IsEmail } from 'class-validator';

export class CreateAssignorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  document: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(140)
  email: string;

  @IsString()
  @MaxLength(20)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(140)
  name: string;
}
