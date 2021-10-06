import Aluno from '../models/Aluno';
import Imagem from '../models/Imagem';

import ImgController from '../controllers/ImgController';

export default {
	async storeAluno(data) {
		const { email, user_creator } = data;

		const existEmail = await Aluno.count({
			where: { email, user_creator },
		});

		if (existEmail) {
			throw new Error('Email existente');
		}

		return Aluno.create(data);
	},

	indexAlunos(user_creator) {
		return Aluno.findAll({
			where: {
				user_creator,
			},
			logging: true,
			include: Imagem,
		});
	},

	async updateAluno(req, alunoId) {
		const aluno = await Aluno.findByPk(alunoId);

		if (!aluno || aluno.user_creator !== req.userId) {
			throw new Error('Usuário não existe');
		}

		if (req.data.email) {
			const isSingle = await Aluno.findAll({
				where: { email: req.data.email, user_creator: req.userId },
			});

			if (isSingle.length) {
				throw new Error('Email existente');
			}
		}
		return aluno.update(req.data);
	},

	async deleteALuno(userId, alunoId) {
		const aluno = await Aluno.findByPk(alunoId);
		if (!aluno || aluno.user_creator !== userId) {
			throw new Error('Aluno não encontrado');
		}

		await ImgController.delete(alunoId);

		await aluno.destroy();
		return 'ok';
	},
};
