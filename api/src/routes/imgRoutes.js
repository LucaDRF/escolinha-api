import { Router } from 'express';
import ImgController from '../app/controllers/ImgController';
import fileCreator from '../app/middlewares/fileCreator';

const imgRoutes = new Router();

imgRoutes.post('/img', fileCreator.create, ImgController.store);
imgRoutes.put('/img', fileCreator.create, ImgController.update);
imgRoutes.delete('/img/:alunoId', ImgController.delete);

export default imgRoutes;
