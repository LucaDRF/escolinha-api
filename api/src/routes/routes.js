import { Router } from 'express';

import imgRoutes from './imgRoutes';
import tokenRoutes from './tokenRoutes';
import alunoRoutes from './alunoRoute';
import userRoutes from './userRoutes';

import auth from '../app/middlewares/auth';

const routes = new Router();

routes.use(tokenRoutes);
routes.use(userRoutes);

routes.use(auth.autentication);

routes.use(imgRoutes);
routes.use(alunoRoutes);

export default routes;
