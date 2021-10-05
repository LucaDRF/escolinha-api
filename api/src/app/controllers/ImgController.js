import { unlink } from 'fs';
import Aluno from '../models/Aluno';
import Imagem from '../models/Imagem';

export default {
	async store(req, res) {
		const { originalname, filename, aluno_id } = req.body;

		const aluno = await Aluno.findByPk(aluno_id);

		if (!aluno) {
			return res.status(400).json({ error: 'Aluno não encontrado' });
		}

		if (await Imagem.findOne({ where: { aluno_id } })) {
			return res.status(400).json({ error: 'Aluno já tem foto' });
		}

		const foto = await Imagem.create({ originalname, filename, aluno_id });
		aluno.update({ foto_id: foto.id });

		return res.json(foto);
	},

	async update(req, res) {
		const { originalname, filename, aluno_id } = req.body;

		const aluno = await Aluno.findByPk(aluno_id);

		if (!aluno) {
			return res.status(400).json({ error: 'Aluno não encontrado' });
		}

		const originalFoto = await Imagem.findOne({ where: { aluno_id } });

		if (!originalFoto) {
			unlink(`uploads/images/${filename}`, (err) => {
				if (err) throw err;
			});
			return res.status(400).json({ error: 'Aluno não tem foto' });
		}

		unlink(`uploads/images/${originalFoto.filename}`, (err) => {
			if (err) throw err;
		});

		await aluno.update({ foto_id: null });
		await originalFoto.destroy();

		const foto = await Imagem.create({ originalname, filename, aluno_id });
		aluno.update({ foto_id: foto.id });

		return res.json(foto);
	},

	async delete(req, res) {
		const { alunoId } = req.params;
		const aluno = await Aluno.findByPk(alunoId);

		if (!aluno) {
			return res.status(400).json({ error: 'Aluno não encontrado' });
		}

		const foto = await Imagem.findOne({
			where: {
				id: aluno.foto_id,
			},
		});
		if (!foto) {
			return res.status(400).json({ error: 'Foto não encontrada' });
		}

		await aluno.update({ foto_id: null });
		await foto.destroy();

		unlink(`uploads/images/${foto.filename}`, (err) => {
			if (err) {
				console.log(err, 'error');
				throw err;
			}
		});

		return res.json({ deleted: true });
	},
};
