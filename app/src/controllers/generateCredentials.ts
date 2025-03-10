import { nk } from '../components/commands';
import { NkResult } from '../types/NkResult';

import type { NextFunction, Request, Response } from 'express';

const controller = {
  generate: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const response: NkResult = await nk();
      res.status(200).send(response);
    } catch (e: unknown) {
      next(e);
    }
  }
};

export default controller;
