import { Test } from '@nestjs/testing';
import { PayableRepository } from './payable.repository';
import { PayableService } from './payable.service';
import { mockPayable } from './tests/payable.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const mockPayableRepository = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findAllIds: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
});

describe('PayableService', () => {
  let payableService: PayableService;
  let payableRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PayableService,
        { provide: PayableRepository, useFactory: mockPayableRepository },
      ],
    }).compile();
    payableService = module.get(PayableService);
    payableRepository = module.get(PayableRepository);
  });
  it('should be defined', () => {
    expect(payableService).toBeDefined();
  });
  describe('create payable', () => {
    it('should successfuly create a new payable', async () => {
      const newMockPayable = mockPayable();
      const { value, emissionDate, assignorId } = newMockPayable;
      const createPayable = { value, emissionDate, assignorId };

      payableRepository.create.mockResolvedValue(newMockPayable);

      const result = await payableService.create(createPayable);
      expect(payableRepository.create).toHaveBeenCalled();
      expect(result).toEqual(newMockPayable);
    });
    it('shouldn`t create a new payable with invalid assignor Id', async () => {
      const newMockPayable = mockPayable({ assignorId: '2' });
      const { value, emissionDate, assignorId } = newMockPayable;
      const createPayable = { value, emissionDate, assignorId };

      payableRepository.create.mockRejectedValue(
        new BadRequestException(`Invalid ID format: ${assignorId}`),
      );
      await expect(payableService.create(createPayable)).rejects.toThrow(
        new BadRequestException(`Invalid ID format: ${assignorId}`),
      );
      expect(payableRepository.create).toHaveBeenCalledWith(createPayable);
    });
    it('shouldn`t create a new payable with non existing assignor Id', async () => {
      const newMockPayable = mockPayable();
      const { value, emissionDate, assignorId } = newMockPayable;
      const createPayable = { value, emissionDate, assignorId };

      payableRepository.create.mockRejectedValue(
        new NotFoundException(`Assignor with ID ${assignorId} not found`),
      );
      await expect(payableService.create(createPayable)).rejects.toThrow(
        new NotFoundException(`Assignor with ID ${assignorId} not found`),
      );
      expect(payableRepository.create).toHaveBeenCalledWith(createPayable);
    });
  });
  describe('update payable', () => {
    it('should successfuly update a new payable', async () => {
      const newMockPayable = mockPayable();
      const { value, emissionDate, assignorId } = newMockPayable;
      const data = { value, emissionDate, assignorId };

      payableRepository.update.mockResolvedValue(newMockPayable);

      const result = await payableService.update(assignorId, data);
      expect(payableRepository.update).toHaveBeenCalled();
      expect(result).toEqual(newMockPayable);
    });
    it('shouldn`t update payable with invalid assignor Id', async () => {
      const newMockPayable = mockPayable({ assignorId: '12345678910' });
      const { value, emissionDate, assignorId } = newMockPayable;
      const data = { value, emissionDate, assignorId };

      payableRepository.update.mockRejectedValue(
        new BadRequestException(`Invalid ID format: ${assignorId}`),
      );
      await expect(payableService.update(assignorId, data)).rejects.toThrow(
        new BadRequestException(`Invalid ID format: ${assignorId}`),
      );
      expect(payableRepository.update).toHaveBeenCalledWith(assignorId, data);
    });
    it('shouldn`t update payable with non existing assignor Id', async () => {
      const newMockPayable = mockPayable();
      const { value, emissionDate, assignorId } = newMockPayable;
      const data = { value, emissionDate, assignorId };

      payableRepository.update.mockRejectedValue(
        new NotFoundException(`Assignor with ID ${assignorId} not found`),
      );
      await expect(payableService.update(assignorId, data)).rejects.toThrow(
        new NotFoundException(`Assignor with ID ${assignorId} not found`),
      );
      expect(payableRepository.update).toHaveBeenCalledWith(assignorId, data);
    });
  });
  describe('find payable', () => {
    it('should find payable', async () => {
      const newMockPayable = mockPayable();
      const { id } = newMockPayable;

      payableRepository.findById.mockResolvedValue(newMockPayable);
      const response = await payableService.findById(id);
      expect(response).toEqual(newMockPayable);
      expect(payableRepository.findById).toHaveBeenCalledWith(id);
    });
    it('shouldn`t find payable with invalid UUID', async () => {
      const newMockPayable = mockPayable({ id: '12345678910' });
      const { id } = newMockPayable;

      payableRepository.findById.mockRejectedValue(
        new BadRequestException(`Invalid ID format: ${id}`),
      );
      await expect(payableService.findById(id)).rejects.toThrow(
        new BadRequestException(`Invalid ID format: ${id}`),
      );
      expect(payableRepository.findById).toHaveBeenCalledWith(id);
    });
    it('shouldn`t not find non existing payable', async () => {
      const newMockPayable = mockPayable();
      const { id } = newMockPayable;

      payableRepository.findById.mockRejectedValue(
        new NotFoundException(`Payable with ID ${id} not found`),
      );
      await expect(payableService.findById(id)).rejects.toThrow(
        new NotFoundException(`Payable with ID ${id} not found`),
      );
      expect(payableRepository.findById).toHaveBeenCalledWith(id);
    });
  });
  describe('find all payables', () => {
    it('should find all payables', async () => {
      const newMockPayable = mockPayable();

      payableRepository.findAll.mockResolvedValue([newMockPayable]);
      const response = await payableService.findAll({ skip: 0, take: 10 });
      expect(response).toEqual([newMockPayable]);
      expect(payableRepository.findAll).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
    });
  });
  describe('remove payable', () => {
    it('should remove payables by id`', async () => {
      const newMockPayable = mockPayable();
      const { id } = newMockPayable;

      payableRepository.remove.mockResolvedValue({
        message: `Payable with ID ${id} has been deleted successfully`,
      });
      const response = await payableService.remove(id);
      expect(response).toEqual({
        message: `Payable with ID ${id} has been deleted successfully`,
      });
      expect(payableRepository.remove).toHaveBeenCalledWith(id);
    });
    it('shouldn`t remove payable with invalid UUID', async () => {
      const newMockPayable = mockPayable({ id: '12345678910' });
      const { id } = newMockPayable;

      payableRepository.remove.mockRejectedValue(
        new BadRequestException(`Invalid ID format: ${id}`),
      );
      await expect(payableService.remove(id)).rejects.toThrow(
        new BadRequestException(`Invalid ID format: ${id}`),
      );
      expect(payableRepository.remove).toHaveBeenCalledWith(id);
    });
    it('shouldn`t remove find non existing payable', async () => {
      const newMockPayable = mockPayable();
      const { id } = newMockPayable;

      payableRepository.remove.mockRejectedValue(
        new NotFoundException(`Payable with ID ${id} not found`),
      );
      await expect(payableService.remove(id)).rejects.toThrow(
        new NotFoundException(`Payable with ID ${id} not found`),
      );
      expect(payableRepository.remove).toHaveBeenCalledWith(id);
    });
  });
});
