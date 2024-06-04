import { IsNotEmpty, IsUUID, IsNumber, Min } from 'class-validator';

export class CreatePayableDto {
  @IsNumber(
    {
      maxDecimalPlaces: 2,
    },
    { message: 'Value must have at most two decimal places' },
  )
  @Min(0, { message: 'Value must be a positive number' })
  @IsNotEmpty({ message: 'Value is required' })
  value: number;

  @IsNotEmpty({ message: 'Emission Date is required' })
  emissionDate: Date;

  @IsUUID(4, { message: 'Assignor ID  must be a valid UUID' })
  @IsNotEmpty({ message: 'Assignor ID is required' })
  assignorId: string;
}
