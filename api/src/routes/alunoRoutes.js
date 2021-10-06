import { Router } from 'express';

import AlunoController from '../app/controllers/AlunoController';
import AlunoSchemas from '../schemas/AlunoSchemas';

const alunoRoutes = new Router();

alunoRoutes.get('/aluno', AlunoController.index);
alunoRoutes.post('/aluno', AlunoSchemas.storeValidation, AlunoController.store);
alunoRoutes.put('/aluno/:alunoId', AlunoSchemas.updateValidation, AlunoController.update);
alunoRoutes.delete('/aluno/:alunoId', AlunoController.delete);

export default alunoRoutes;
