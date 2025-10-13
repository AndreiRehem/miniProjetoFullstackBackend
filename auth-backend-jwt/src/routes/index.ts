// src/routes/index.ts
import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { protectedRoute } from '../controllers/protected.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// POST /register
router.post('/register', register); 

// POST /login
router.post('/login', login); 

// --- Rotas Protegidas ---
// GET /protected (Acesso somente com token válido)
router.get('/protected', authenticateToken, protectedRoute);

export default router;