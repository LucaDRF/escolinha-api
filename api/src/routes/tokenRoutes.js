import { Router } from 'express';
import TokenController from '../app/controllers/TokenController';

const tokenRoutes = new Router();

tokenRoutes.post('/login', TokenController.login);

export default tokenRoutes;
