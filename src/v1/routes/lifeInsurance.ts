import {Router } from 'express';
import { seguroVidaComparadorCotizador } from '../controllers/lifeInsurance';
const router =Router();
router.post('/comparator_service', seguroVidaComparadorCotizador)

export default router