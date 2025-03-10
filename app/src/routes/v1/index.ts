import { currentUser } from '../../middleware/authentication';
import express from 'express';
import generateCredentials from './generateCredentials';

const router = express.Router();
router.use(currentUser);

// Base v1 Responder
router.get('/', (_req, res) => {
  res.status(200).json({
    endpoints: ['/generateCredentials']
  });
});

/** Config Router */
router.use('/generateCredentials', generateCredentials);

export default router;
