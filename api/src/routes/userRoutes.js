import { Router } from 'express';

import UserController from '../app/controllers/UserController';
import auth from '../app/middlewares/auth';

const userRoutes = new Router();

userRoutes.post('/user', UserController.store);

userRoutes.use(auth.autentication);

userRoutes.get('/user', UserController.show);

userRoutes.put('/user', UserController.update);
userRoutes.delete('/user', UserController.delete);

export default userRoutes;
