// import { AssignorService } from '../assignor.service';

// import { mockAssignor } from './assignor.mock';
// import { DatabaseModule } from '../../database/database.module';
// import { Test, TestingModule } from '@nestjs/testing';
// import { DatabaseService } from '../../database/database.service';
// import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
// import { PrismaClient } from '@prisma/client';

// // https://guymanzurola.medium.com/nestjs-mocking-with-jest-mock-extended-31abdc1c5b2d

// describe('Assignor test unit', () => {
//   let assignorService: AssignorService;
//   let databaseService: DeepMockProxy<PrismaClient>;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [DatabaseModule],
//       providers: [AssignorService, DatabaseService],
//     })
//       .overrideProvider(DatabaseService)
//       .useValue(mockDeep<PrismaClient>())
//       .compile();

//     assignorService = module.get<AssignorService>(AssignorService);
//     databaseService = module.get<DatabaseService>(DatabaseService);

//     describe('create new assignor', () => {
//       it('should create an assignor', async () => {
//         const newAssignor = mockAssignor();

//         const result = await assignorService.create(newAssignor);
//         expect(result).toBeDefined();
//         expect(result).toEqual(newAssignor);
//         expect(assignorService.create).toHaveBeenCalledWith(newAssignor);
//       });

//       // it('should not be able create an assignor with an invalid email', async () => {
//       //   const newAssignor = {
//       //     document: '12345678',
//       //     email: 'testexample.com',
//       //     phone: '1234567890',
//       //     name: 'Test Assignor',
//       //   };

//       //   jest
//       //     .spyOn(assignorService, 'create')
//       //     .mockRejectedValue(new BadRequestException('email must be an email'));

//       //   try {
//       //     await assignorService.create(newAssignor);
//       //   } catch (error) {
//       //     expect(error).toBeInstanceOf(BadRequestException);
//       //     expect(error.response.message).toBe('email must be an email');
//       //   }
//       // });
//       // it('should not be able create an assignor with an email in use', async () => {
//       //   const existent = {
//       //     document: '09892564000150',
//       //     email: 'test@example.com',
//       //     phone: '1234567890',
//       //     name: 'Test Assignor',
//       //   };
//       //   jest.spyOn(assignorService, 'create').mockResolvedValue(existent);

//       //   const resu = await assignorService.create(existent);
//       //   console.log(resu);
//       //   const repeatedEmailAssignor = {
//       //     document: '79430334000',
//       //     email: 'test@example.com',
//       //     phone: '1234567890',
//       //     name: 'Test Assignor',
//       //   };
//       //   jest
//       //     .spyOn(assignorService, 'create')
//       //     .mockResolvedValue(repeatedEmailAssignor);

//       //   try {
//       //     const result = await assignorService.create(repeatedEmailAssignor);
//       //     console.log(result);

//       //     // Se não ocorrer um erro, falha o teste
//       //     expect(result).not.toBeDefined(); // Certifique-se de que o resultado seja undefined
//       //   } catch (error) {
//       //     // Se ocorrer um erro, verifique se é o erro esperado
//       //     expect(error.message).toBe('Email is already in use');
//       //   }
//       // });
//       // it('should not be able to create an assignor using a invalid document', async () => {
//       //   const newAssignor = {
//       //     document: '12345678978',
//       //     email: 'test@example.com',
//       //     phone: '1234567890',
//       //     name: 'Test Assignor',
//       //   };

//       //   await expect(assignorService.create(newAssignor)).rejects.toThrow(
//       //     BadRequestException,
//       //   );
//       // });
//       // it('should not be able to create an assignor using a invalid email', async () => {
//       //   const wrongEmail = {
//       //     document: '09892564000150',
//       //     email: 'testexample.com',
//       //     phone: '1234567890',
//       //     name: 'Test Assignor',
//       //   };

//       //   const result = await assignorService.create(wrongEmail);
//       //   console.log(result);
//       // });
//     });
//     // describe('delete new assignor', () => {
//     //   it('should delete the new assignor', async () => {
//     //     const result = await assignorService.findAll();
//     //     expect(result).toBeDefined();
//     //     console.log(result);
//     //   });
//     // });
//   });
// });
