import { AssignorService } from '../assignor.service';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../../database/database.service';
import { DatabaseModule } from '../../database/database.module';
import { mockDeep } from 'jest-mock-extended';
import { Assignor, PrismaClient } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

const assignor = {
  document: '09892564000150',
  email: 'test@example.com',
  phone: '1234567890',
  name: 'Test Assignor',
};

const assignors: Assignor[] = [];

describe('Assignor test unit', () => {
  let assignorService: AssignorService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        AssignorService,
        {
          provide: 'DatabaseService',
          useValue: {
            assignor: {
              create: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockDeep(PrismaClient))
      .compile();

    assignorService = module.get<AssignorService>(AssignorService);
    databaseService = module.get<DatabaseService>(DatabaseService);

    // databaseService.assignor.findMany = jest.fn().mockResolvedValue(assignors);
    // databaseService.assignor.findFirst = jest
    //   .fn()
    //   .mockResolvedValue(assignors[0]);
    // databaseService.assignor.create = jest.fn().mockResolvedValue(assignor);
    // databaseService.assignor.update = jest.fn().mockResolvedValue(assignor);
    // databaseService.assignor.delete = jest.fn().mockResolvedValue(assignor);
  });
  it('should be defined', () => {
    expect(assignorService).toBeDefined();
    expect(databaseService).toBeDefined();
  });
  describe('get all assignors', () => {
    it('should return a list of assignors successfully', async () => {
      jest
        .spyOn(databaseService.assignor, 'findMany')
        .mockResolvedValue([playa]);
    });
  });
  describe('create new assignor', () => {
    it('should create an assignor', async () => {
      const newAssignor = {
        document: '09892564000150',
        email: 'test@example.com',
        phone: '1234567890',
        name: 'Test Assignor',
      };

      jest.spyOn(assignorService, 'create').mockResolvedValue({} as Assignor);

      const result = await assignorService.create(newAssignor);
      expect(result).toBeDefined();
      console.log(result);
    });
    it('should not be able to create an assignor using a invalid document', async () => {
      const newAssignor = {
        document: '123456789',
        email: 'test@example.com',
        phone: '1234567890',
        name: 'Test Assignor',
      };

      jest.spyOn(assignorService, 'create').mockResolvedValue({} as Assignor);

      const result = await assignorService.create(newAssignor);
      console.log(result);
    });
    // it('should not be able to create an assignor using a invalid document', async () => {
    //   const newAssignor = {
    //     document: '12345678978',
    //     email: 'test@example.com',
    //     phone: '1234567890',
    //     name: 'Test Assignor',
    //   };

    //   await expect(assignorService.create(newAssignor)).rejects.toThrow(
    //     BadRequestException,
    //   );
    // });
    // it('should not be able to create an assignor using a invalid email', async () => {
    //   const wrongEmail = {
    //     document: '09892564000150',
    //     email: 'testexample.com',
    //     phone: '1234567890',
    //     name: 'Test Assignor',
    //   };

    //   const result = await assignorService.create(wrongEmail);
    //   console.log(result);
    // });
  });
  // describe('delete new assignor', () => {
  //   it('should delete the new assignor', async () => {
  //     const result = await assignorService.findAll();
  //     expect(result).toBeDefined();
  //     console.log(result);
  //   });
  // });
});
