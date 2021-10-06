import { Router } from 'express';

import UserController from '../app/controllers/UserController';
import UserSchemas from '../schemas/UserSchemas';
import auth from '../app/middlewares/auth';

const userRoutes = new Router();

userRoutes.post('/user', UserSchemas.storeValidation, UserController.store);

userRoutes.get('/user', auth.autentication, UserController.show);

userRoutes.put('/user', [auth.autentication, UserSchemas.updateValidation], UserController.update);
userRoutes.delete('/user', auth.autentication, UserController.delete);

export default userRoutes;
