import * as Yup from 'yup';
import User from '../models/User';

export default {
	async store(req, res) {
		const schema = Yup.object().shape({
			nome: Yup.string().required(),
			email: Yup.string().email().required(),
			password: Yup.string().required().min(6),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Erro na validação' });
		}

		const isSingle = await User.findAll({
			where: { email: req.body.email },
		});

		if (isSingle.length) {
			return res.status(401).json({ error: 'Email existente' });
		}

		const { id, nome, email } = await User.create(req.body);
		return res.json({ id, nome, email });
	},

	async show(req, res) {
		const { userId } = req;
		const user = await User.findByPk(userId);

		if (!user) {
			return res.status(401).json({ error: 'User não encontrado' });
		}

		return res.json(user);
	},

	async update(req, res) {
		const schema = Yup.object().shape({
			nome: Yup.string(),
			email: Yup.string().email(),
			oldPassword: Yup.string(),
			password: Yup.string().min(6)
				.when('oldPassword', (oldPassword, field) => (oldPassword ? field.required() : field)),
			confirmPassword: Yup.string()
				.when('password', (password, field) => (password ? field.required().oneOf([password]) : field)), // oneOf // matches
		});

		const user = await User.findByPk(req.userId);

		if (!user) {
			return res.status(400).json({ error: 'Usuário não encontrado' });
		}

		if (!(await schema.isValid(req.body))) {
			return res.status(401).json({ error: 'Falha na validação' });
		}

		const { email, oldPassword } = req.body;
		if (oldPassword && !(await user.checkPassword(oldPassword))) {
			return res.status(400).json({ error: 'Senha inválida' });
		}

		if (email) {
			const emailNotSingle = await User.findAll({
				where: { email },
			});
			if (emailNotSingle.length) {
				return res.status(401).json({ error: 'Email existente' });
			}
		}

		const { newEmail } = await user.update(req.body);

		return res.json({ newEmail, keyChanged: req.body });
	},

	async delete(req, res) {
		const user = await User.findByPk(req.userId);

		user.destroy();
		return res.json({ ok: true });
	},
};
