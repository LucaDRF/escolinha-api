import { unlink } from 'fs';
import Aluno from '../models/Aluno';
import Imagem from '../models/Imagem';

export default {
	async storeService(data) {
		const { originalname, filename, aluno_id } = data;

		const aluno = await Aluno.findByPk(aluno_id);

		if (!aluno) {
			throw new Error('Aluno não encontrado');
		}

		if (await Imagem.findOne({ where: { aluno_id } })) {
			throw new Error('Aluno já tem foto');
		}

		const foto = await Imagem.create({ originalname, filename, aluno_id });
		aluno.update({ foto_id: foto.id });
		return foto;
	},
	async updateService(data) {
		const { originalname, filename, aluno_id } = data;

		const aluno = await Aluno.findByPk(aluno_id);

		if (!aluno) {
			throw new Error('Aluno não encontrado');
		}

		const originalFoto = await Imagem.findOne({ where: { aluno_id } });

		if (!originalFoto) {
			unlink(`uploads/images/${filename}`, (err) => {
				if (err) throw err;
			});
			throw new Error('Aluno não tem foto');
		}

		unlink(`uploads/images/${originalFoto.filename}`, (err) => {
			if (err) throw err;
		});

		await aluno.update({ foto_id: null });
		await originalFoto.destroy();

		const foto = await Imagem.create({ originalname, filename, aluno_id });
		aluno.update({ foto_id: foto.id });
	},
	async deleteService(alunoId) {
		const aluno = await Aluno.findByPk(alunoId);

		if (!aluno) {
			throw new Error('Aluno não encontrado');
		}

		const foto = await Imagem.findOne({
			where: {
				id: aluno.foto_id,
			},
		});
		if (!foto) {
			return;
		}

		await aluno.update({ foto_id: null });
		await foto.destroy();

		unlink(`uploads/images/${foto.filename}`, (err) => {
			if (err) {
				console.log(err, 'error');
				throw err;
			}
		});
	},
};
