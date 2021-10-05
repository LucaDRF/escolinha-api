import { Router } from 'express';

import AlunoController from './app/controllers/AlunoController';
import UserController from './app/controllers/UserController';
import TokenController from './app/controllers/TokenController';
import ImgController from './app/controllers/ImgController';

import auth from './app/middlewares/auth';
import fileCreator from './app/middlewares/fileCreator';

const routes = new Router();

routes.post('/login', TokenController.login);

routes.post('/user', UserController.store);

routes.use(auth.autentication);

routes.get('/user', UserController.show);

routes.post('/img', fileCreator.create, ImgController.store);
routes.put('/img', fileCreator.create, ImgController.update);
routes.delete('/img/:alunoId', ImgController.delete);

routes.put('/user', UserController.update);
routes.delete('/user', UserController.delete);

routes.get('/aluno', AlunoController.index);
routes.post('/aluno', AlunoController.store);
routes.put('/aluno/:alunoId', AlunoController.update);
routes.delete('/aluno/:alunoId', AlunoController.delete);

export default routes;
