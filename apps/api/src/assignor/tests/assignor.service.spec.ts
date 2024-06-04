import { Test } from '@nestjs/testing';
import { AssignorRepository } from '../assignor.repository';
import { AssignorService } from '../assignor.service';
import { mockAssignor } from './assignor.mock';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { cnpj, cpf } from 'cpf-cnpj-validator';

const mockAssignorRepository = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findAllIds: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
});

describe('AssignorService', () => {
  let assignorService: AssignorService;
  let assignorRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AssignorService,
        { provide: AssignorRepository, useFactory: mockAssignorRepository },
      ],
    }).compile();
    assignorService = module.get(AssignorService);
    assignorRepository = module.get(AssignorRepository);
  });
  describe('create assignor', () => {
    it('should successfuly create a new assignor', async () => {
      const newMockAssignor = mockAssignor();
      const { email, name, document, phone } = newMockAssignor;
      const createAssignor = { email, name, document, phone };

      assignorRepository.create.mockResolvedValue(newMockAssignor);

      const result = await assignorService.create(createAssignor);
      expect(assignorRepository.create).toHaveBeenCalled();
      expect(result).toEqual(newMockAssignor);
    });
    it('shouldn`t create a new assignor with invalid document', async () => {
      const newMockAssignor = mockAssignor({ document: '12345678910' });
      const { email, name, document, phone } = newMockAssignor;
      const createAssignor = { email, name, document, phone };

      assignorRepository.create.mockRejectedValue(
        new BadRequestException(`${document} is not a valid document`),
      );
      await expect(assignorService.create(createAssignor)).rejects.toThrow(
        new BadRequestException(`${document} is not a valid document`),
      );
      expect(assignorRepository.create).toHaveBeenCalledWith(createAssignor);
    });
    it('shouldn`t create a new assignor with in use document', async () => {
      const newMockAssignor = mockAssignor();
      const { email, name, document, phone } = newMockAssignor;
      const createAssignor = { email, name, document, phone };

      assignorRepository.create.mockRejectedValue(
        new ConflictException('Document is already in use'),
      );
      await expect(assignorService.create(createAssignor)).rejects.toThrow(
        new ConflictException('Document is already in use'),
      );
      expect(assignorRepository.create).toHaveBeenCalledWith(createAssignor);
    });
    it('shouldn`t create a new assignor with in use email', async () => {
      const newMockAssignor = mockAssignor();
      const { email, name, document, phone } = newMockAssignor;
      const createAssignor = { email, name, document, phone };

      assignorRepository.create.mockRejectedValue(
        new ConflictException('Email is already in use'),
      );
      await expect(assignorService.create(createAssignor)).rejects.toThrow(
        new ConflictException('Email is already in use'),
      );
      expect(assignorRepository.create).toHaveBeenCalledWith(createAssignor);
    });
  });
  describe('update assignor', () => {
    it('should successfuly update a new assignor', async () => {
      const newMockAssignor = mockAssignor();
      const { email, name, document, phone, id } = newMockAssignor;
      const data = { email, name, document, phone };

      assignorRepository.update.mockResolvedValue(newMockAssignor);

      const result = await assignorService.update(id, data);
      expect(assignorRepository.update).toHaveBeenCalled();
      expect(result).toEqual(newMockAssignor);
    });
    it('shouldn`t update assignor with invalid document', async () => {
      const newMockAssignor = mockAssignor({ document: '12345678910' });
      const { email, name, document, phone, id } = newMockAssignor;
      const data = { email, name, document, phone };

      assignorRepository.update.mockRejectedValue(
        new BadRequestException(`${document} is not a valid document`),
      );
      await expect(assignorService.update(id, data)).rejects.toThrow(
        new BadRequestException(`${document} is not a valid document`),
      );
      expect(assignorRepository.update).toHaveBeenCalledWith(id, data);
    });
    it('shouldn`t update assignor with in use document', async () => {
      const newMockAssignor = mockAssignor({ document: '12345678910' });
      const { email, name, document, phone, id } = newMockAssignor;
      const data = { email, name, document, phone };

      assignorRepository.update.mockRejectedValue(
        new ConflictException('Document is already in use'),
      );
      await expect(assignorService.update(id, data)).rejects.toThrow(
        new ConflictException('Document is already in use'),
      );
      expect(assignorRepository.update).toHaveBeenCalledWith(id, data);
    });
    it('shouldn`t update assignor with in use email', async () => {
      const newMockAssignor = mockAssignor({ document: '12345678910' });
      const { email, name, document, phone, id } = newMockAssignor;
      const data = { email, name, document, phone };

      assignorRepository.update.mockRejectedValue(
        new ConflictException('Email is already in use'),
      );
      await expect(assignorService.update(id, data)).rejects.toThrow(
        new ConflictException('Email is already in use'),
      );
      expect(assignorRepository.update).toHaveBeenCalledWith(id, data);
    });
    it('shouldn`t update assignor with invalid UUID', async () => {
      const newMockAssignor = mockAssignor({ id: '12345678910' });
      const { email, name, document, phone, id } = newMockAssignor;
      const data = { email, name, document, phone };

      assignorRepository.update.mockRejectedValue(
        new BadRequestException(`Invalid ID format: ${id}`),
      );
      await expect(assignorService.update(id, data)).rejects.toThrow(
        new BadRequestException(`Invalid ID format: ${id}`),
      );
      expect(assignorRepository.update).toHaveBeenCalledWith(id, data);
    });
    it('shouldn`t update non existing assignor', async () => {
      const newMockAssignor = mockAssignor({ id: '12345678910' });
      const { email, name, document, phone, id } = newMockAssignor;
      const data = { email, name, document, phone };

      assignorRepository.update.mockRejectedValue(
        new NotFoundException(`Assignor with ID ${id} not found`),
      );
      await expect(assignorService.update(id, data)).rejects.toThrow(
        new NotFoundException(`Assignor with ID ${id} not found`),
      );
      expect(assignorRepository.update).toHaveBeenCalledWith(id, data);
    });
  });
  describe('find assignor', () => {
    it('should find assignor', async () => {
      const newMockAssignor = mockAssignor({ id: '12345678910' });
      const { id } = newMockAssignor;

      assignorRepository.findById.mockResolvedValue(newMockAssignor);
      const response = await assignorService.findById(id);
      expect(response).toEqual(newMockAssignor);
      expect(assignorRepository.findById).toHaveBeenCalledWith(id);
    });
    it('shouldn`t find assignor with invalid UUID', async () => {
      const newMockAssignor = mockAssignor({ id: '12345678910' });
      const { id } = newMockAssignor;

      assignorRepository.findById.mockRejectedValue(
        new BadRequestException(`Invalid ID format: ${id}`),
      );
      await expect(assignorService.findById(id)).rejects.toThrow(
        new BadRequestException(`Invalid ID format: ${id}`),
      );
      expect(assignorRepository.findById).toHaveBeenCalledWith(id);
    });
    it('shouldn`t not find non existing assignor', async () => {
      const newMockAssignor = mockAssignor();
      const { id } = newMockAssignor;

      assignorRepository.findById.mockRejectedValue(
        new NotFoundException(`Assignor with ID ${id} not found`),
      );
      await expect(assignorService.findById(id)).rejects.toThrow(
        new NotFoundException(`Assignor with ID ${id} not found`),
      );
      expect(assignorRepository.findById).toHaveBeenCalledWith(id);
    });
  });
  describe('find all assignors', () => {
    it('should find all assignors', async () => {
      const newMockAssignor = mockAssignor();

      assignorRepository.findAll.mockResolvedValue([newMockAssignor]);
      const response = await assignorService.findAll({ skip: 0, take: 10 });
      expect(response).toEqual([newMockAssignor]);
      expect(assignorRepository.findAll).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
    });
  });
  describe('remove assignor', () => {
    it('should remove assignors by id`', async () => {
      const newMockAssignor = mockAssignor();
      const { id } = newMockAssignor;

      assignorRepository.remove.mockResolvedValue({
        message: `Assignor with ID ${id} has been deleted successfully`,
      });
      const response = await assignorService.remove(id);
      expect(response).toEqual({
        message: `Assignor with ID ${id} has been deleted successfully`,
      });
      expect(assignorRepository.remove).toHaveBeenCalledWith(id);
    });
    it('shouldn`t remove assignor with invalid UUID', async () => {
      const newMockAssignor = mockAssignor({ id: '12345678910' });
      const { id } = newMockAssignor;

      assignorRepository.remove.mockRejectedValue(
        new BadRequestException(`Invalid ID format: ${id}`),
      );
      await expect(assignorService.remove(id)).rejects.toThrow(
        new BadRequestException(`Invalid ID format: ${id}`),
      );
      expect(assignorRepository.remove).toHaveBeenCalledWith(id);
    });
    it('shouldn`t remove find non existing assignor', async () => {
      const newMockAssignor = mockAssignor();
      const { id } = newMockAssignor;

      assignorRepository.remove.mockRejectedValue(
        new NotFoundException(`Assignor with ID ${id} not found`),
      );
      await expect(assignorService.remove(id)).rejects.toThrow(
        new NotFoundException(`Assignor with ID ${id} not found`),
      );
      expect(assignorRepository.remove).toHaveBeenCalledWith(id);
    });
  });
});
