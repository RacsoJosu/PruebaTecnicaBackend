import { Router } from 'express';
import { seguroVidaComparadorCotizador } from '../controllers/lifeInsurance';
import { errorHandler } from '../../../helpers/errorHandler';
const router = Router();
router.post('/comparator_service', errorHandler, seguroVidaComparadorCotizador);

export default router;
