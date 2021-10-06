import Aluno from '../models/Aluno';
import Imagem from '../models/Imagem';

import ImgController from './ImgController';

export default {
	async store(req, res) {
		const {
			nome, sobrenome, email, altura, peso, user_creator,
		} = req.data;

		const isSingle = await Aluno.findAll({
			where: { email, user_creator },
		});

		if (isSingle.length) {
			return res.status(401).json({ error: 'Email existente' });
		}

		const aluno = await Aluno.create({
			nome, sobrenome, email, altura, peso, user_creator,
		});

		return res.json(aluno);
	},

	async index(req, res) {
		const alunos = await Aluno.findAll({
			where: {
				user_creator: req.userId,
			},
			logging: true,
			include: Imagem,
		});

		return res.json(alunos);
	},

	async update(req, res) {
		const { alunoId } = req.params;

		const aluno = await Aluno.findByPk(alunoId);

		if (!aluno || aluno.user_creator !== req.userId) {
			return res.status(401).json({ error: 'Usuário não existe' });
		}

		if (req.data.email) {
			const isSingle = await Aluno.findAll({
				where: { email: req.data.email, user_creator: req.userId },
			});

			if (isSingle.length) {
				return res.status(401).json({ error: 'Email existente' });
			}
		}
		const alunoUpdated = await aluno.update(req.data);

		return res.json(alunoUpdated);
	},

	async delete(req, res) {
		const { alunoId } = req.params;
		const aluno = await Aluno.findByPk(alunoId);

		await ImgController.delete(req, res);

		if (!aluno || aluno.user_creator !== req.userId) {
			return res.status(401).json({ error: 'Usuário não encontrado' });
		}
		await aluno.destroy();
		return res.json({ ok: true });
	},
};
