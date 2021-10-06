import AlunoServices from '../services/AlunoServices';

export default {
	async store(req, res) {
		try {
			req.data.user_creator = req.userId;
			const aluno = await AlunoServices.storeAluno(req.data);
			return res.json(aluno);
		} catch (error) {
			return res.status(401).json({ error: error.message });
		}
	},

	async index(req, res) {
		try {
			const alunos = await AlunoServices.indexAlunos(req.userId);
			return res.json(alunos);
		} catch (error) {
			return res.status(401).json({ error: error.message });
		}
	},

	async update(req, res) {
		try {
			const alunoUpdated = await AlunoServices.updateAluno(req, req.params.alunoId);
			return res.json(alunoUpdated);
		} catch (error) {
			return res.status(401).json({ error: error.message });
		}
	},

	async delete(req, res) {
		try {
			await AlunoServices.deleteALuno(req.userId, req.params.alunoId);
			return res.json({ ok: true });
		} catch (error) {
			return res.status(401).json({ error: error.message });
		}
	},
};
