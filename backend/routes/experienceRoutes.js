import express from 'express';
import {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience
} from '../controllers/experienceController.js';

const router = express.Router();

// Public routes
router.get('/', getAllExperiences);
router.get('/:id', getExperienceById);

// Admin routes (add authentication middleware here in production)
router.post('/', createExperience);
router.put('/:id', updateExperience);
router.delete('/:id', deleteExperience);

export default router;
