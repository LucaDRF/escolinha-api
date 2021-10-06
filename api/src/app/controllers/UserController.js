import User from '../models/User';

export default {
	async store(req, res) {
		const isSingle = await User.findAll({
			where: { email: req.data.email },
		});

		if (isSingle.length) {
			return res.status(401).json({ error: 'Email existente' });
		}

		const { id, nome, email } = await User.create(req.data);
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
		const user = await User.findByPk(req.userId);

		if (!user) {
			return res.status(400).json({ error: 'Usuário não encontrado' });
		}

		const { email, oldPassword } = req.data;
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

		const { newEmail } = await user.update(req.data);

		return res.json({ newEmail, keyChanged: req.data });
	},

	async delete(req, res) {
		const user = await User.findByPk(req.userId);

		user.destroy();
		return res.json({ ok: true });
	},
};
