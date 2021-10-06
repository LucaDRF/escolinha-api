import { Router } from 'express';

import UserController from '../app/controllers/UserController';
import UserSchemas from '../schemas/UserSchemas';
import auth from '../app/middlewares/auth';

const userRoutes = new Router();

userRoutes.post('/user', UserSchemas.storeValidation, UserController.store);

userRoutes.use(auth.autentication);

userRoutes.get('/user', UserController.show);

userRoutes.put('/user', UserSchemas.updateValidation, UserController.update);
userRoutes.delete('/user', UserController.delete);

export default userRoutes;
