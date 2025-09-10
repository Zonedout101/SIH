"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchSchema = exports.QualityTestSchema = exports.ProcessingStepSchema = exports.CollectionEventSchema = void 0;
const zod_1 = require("zod");
exports.CollectionEventSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    collectorId: zod_1.z.string(),
    species: zod_1.z.string(),
    latitude: zod_1.z.number().min(-90).max(90),
    longitude: zod_1.z.number().min(-180).max(180),
    timestamp: zod_1.z.string(),
    initialQuality: zod_1.z.object({ moisture: zod_1.z.number().optional(), notes: zod_1.z.string().optional() }).default({})
});
exports.ProcessingStepSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    batchId: zod_1.z.string(),
    stepType: zod_1.z.enum(['drying', 'grinding', 'storage', 'packaging', 'transport', 'formulation']),
    metadata: zod_1.z.record(zod_1.z.any()).default({}),
    timestamp: zod_1.z.string()
});
exports.QualityTestSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    batchId: zod_1.z.string(),
    labId: zod_1.z.string(),
    results: zod_1.z.object({ moisture: zod_1.z.number().optional(), pesticide: zod_1.z.number().optional(), dnaAuthenticated: zod_1.z.boolean().optional() }).default({}),
    timestamp: zod_1.z.string()
});
exports.BatchSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
