import { z } from 'zod';

export const CollectionEventSchema = z.object({
  id: z.string().optional(),
  collectorId: z.string(),
  species: z.string(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  timestamp: z.string(),
  initialQuality: z.object({ moisture: z.number().optional(), notes: z.string().optional() }).default({})
});

export const ProcessingStepSchema = z.object({
  id: z.string().optional(),
  batchId: z.string(),
  stepType: z.enum(['drying', 'grinding', 'storage', 'packaging', 'transport', 'formulation']),
  metadata: z.record(z.any()).default({}),
  timestamp: z.string()
});

export const QualityTestSchema = z.object({
  id: z.string().optional(),
  batchId: z.string(),
  labId: z.string(),
  results: z.object({ moisture: z.number().optional(), pesticide: z.number().optional(), dnaAuthenticated: z.boolean().optional() }).default({}),
  timestamp: z.string()
});

export const BatchSchema = z.object({
  id: z.string(),
});

export type CollectionEvent = z.infer<typeof CollectionEventSchema>;
export type ProcessingStep = z.infer<typeof ProcessingStepSchema>;
export type QualityTest = z.infer<typeof QualityTestSchema>;
export type Batch = z.infer<typeof BatchSchema>;

