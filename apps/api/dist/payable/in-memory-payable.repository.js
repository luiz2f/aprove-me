"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryPayableRepository = void 0;
class InMemoryPayableRepository {
    constructor() {
        this.payables = [];
    }
    async create(data) {
        this.payables.push(data);
        return data;
    }
    async findAll() {
        return this.payables;
    }
    async findById(id) {
        return this.payables.find((payable) => payable.id === id);
    }
    async update(id, data) {
        const index = this.payables.findIndex((payable) => payable.id === id);
        this.payables[index] = Object.assign(this.payables[index], data);
        return this.payables[index];
    }
    async remove(id) {
        this.payables = this.payables.filter((payable) => payable.id !== id);
    }
}
exports.InMemoryPayableRepository = InMemoryPayableRepository;
//# sourceMappingURL=in-memory-payable.repository.js.map