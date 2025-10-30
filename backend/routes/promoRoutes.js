import express from 'express';
import {
  validatePromoCode,
  getPromoCode,
  getAllPromoCodes,
  createPromoCode,
  updatePromoCode,
  deletePromoCode
} from '../controllers/promoController.js';

const router = express.Router();

// Public route
router.post('/validate', validatePromoCode);

// Get all promo codes
router.get('/', getAllPromoCodes);

router.get('/:code', getPromoCode);
router.post('/', createPromoCode);
router.put('/:id', updatePromoCode);
router.delete('/:id', deletePromoCode);

export default router;
