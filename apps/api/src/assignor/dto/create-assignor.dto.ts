import { IsNotEmpty, IsString, MaxLength, IsEmail } from 'class-validator';

export class CreateAssignorDto {
  @IsString({ message: 'Document must be a string' })
  @IsNotEmpty({ message: 'Document is required' })
  @MaxLength(30, { message: 'Document max lenght is 30' })
  document: string;

  @MaxLength(140, { message: 'Email max lenght is 140' })
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @MaxLength(20, { message: 'Phone max lenght is 20' })
  @IsString({ message: 'Phone must be a string' })
  phone: string;

  @MaxLength(140, { message: 'Name max lenght is 140' })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
}
