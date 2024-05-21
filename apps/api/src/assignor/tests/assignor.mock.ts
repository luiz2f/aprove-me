import { Assignor } from '@prisma/client';
import { cpf } from 'cpf-cnpj-validator';
import { randomUUID } from 'crypto';

type Override = Partial<Assignor>;

export function mockAssignor(override?: Override): Assignor {
  return {
    id: randomUUID(),
    document: cpf.generate(false),
    email: 'example@mail.com',
    name: 'Exam Ple',
    phone: '5521975214',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  };
}
