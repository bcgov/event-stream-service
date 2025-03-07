import express from 'express';
import { generateCredentialsController } from '../../controllers';
import { requireSomeAuth } from '../../middleware/requireSomeAuth';

import type { NextFunction, Request, Response } from 'express';

const router = express.Router();
router.use(requireSomeAuth);

// Generate Credentials endpoint
router.get('/', (req: Request, res: Response, next: NextFunction): void => {
  generateCredentialsController.generate(req, res, next);
});

export default router;
