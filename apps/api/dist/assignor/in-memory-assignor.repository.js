"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryAssignorRepository = void 0;
class InMemoryAssignorRepository {
    constructor() {
        this.assignors = [];
    }
    async create(data) {
        this.assignors.push(data);
        return data;
    }
    async findAll() {
        return this.assignors;
    }
    async findById(id) {
        return this.assignors.find((assignor) => assignor.id === id);
    }
    async update(id, data) {
        const index = this.assignors.findIndex((assignor) => assignor.id === id);
        this.assignors[index] = Object.assign(this.assignors[index], data);
        return this.assignors[index];
    }
    async remove(id) {
        this.assignors = this.assignors.filter((assignor) => assignor.id !== id);
    }
}
exports.InMemoryAssignorRepository = InMemoryAssignorRepository;
//# sourceMappingURL=in-memory-assignor.repository.js.map