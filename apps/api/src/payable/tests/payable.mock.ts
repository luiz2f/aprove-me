import { Payable } from '@prisma/client';
import { randomUUID } from 'crypto';

type Override = Partial<Payable>;

export function mockPayable(override?: Override): Payable {
  const min = 100;
  const max = 200000;
  return {
    id: randomUUID(),
    value: parseFloat((Math.random() * (max - min) + min).toFixed(2)),
    emissionDate: new Date(),
    assignorId: randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  };
}
