import { Router } from 'express';

import AlunoController from '../app/controllers/AlunoController';

const alunoRoutes = new Router();

alunoRoutes.get('/aluno', AlunoController.index);
alunoRoutes.post('/aluno', AlunoController.store);
alunoRoutes.put('/aluno/:alunoId', AlunoController.update);
alunoRoutes.delete('/aluno/:alunoId', AlunoController.delete);

export default alunoRoutes;
