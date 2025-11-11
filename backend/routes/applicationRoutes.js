import express from 'express';
import {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplicationStatus,
  deleteApplication,
  getStats,
  getScoreDistribution
} from '../controllers/applicationController.js';

const router = express.Router();

// Application routes
router.get('/applications', getAllApplications);
router.get('/applications/:id', getApplicationById);
router.post('/applications', createApplication);
router.patch('/applications/:id', updateApplicationStatus);
router.delete('/applications/:id', deleteApplication);

// Stats routes
router.get('/stats', getStats);
router.get('/score-distribution', getScoreDistribution);

export default router;