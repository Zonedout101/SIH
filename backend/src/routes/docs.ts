import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ayurvedic Traceability API',
      version: '1.0.0'
    }
  },
  apis: [] as string[]
};

const spec = swaggerJSDoc(options as any);

export const router = Router();
router.use('/', swaggerUi.serve, swaggerUi.setup(spec));

