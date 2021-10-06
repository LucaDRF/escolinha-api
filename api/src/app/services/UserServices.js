import User from '../models/User';

export default {
	async storeUser(data) {
		const emailExists = await User.count({
			where: { email: data.email },
		});

		if (emailExists) {
			throw new Error('Email existente');
		}

		return User.create(data);
	},

	async showUser(userId) {
		const user = await User.findByPk(userId);

		if (!user) {
			throw new Error('User não encontrado');
		}

		return user;
	},

	async updateUser(data) {
		const user = await User.findByPk(data.userId);

		if (!user) {
			throw new Error('Usuário não encontrado');
		}

		const { email, oldPassword } = data;
		if (oldPassword && !(await user.checkPassword(oldPassword))) {
			throw new Error('Senha inválida');
		}

		if (email) {
			const emailNotSingle = await User.findAll({
				where: { email },
			});
			if (emailNotSingle.length) {
				throw new Error('Email existente');
			}
		}

		const { newEmail } = await user.update(data);
		return { newEmail, keyChanged: data };
	},

	async deleteUser(userId) {
		const user = await User.findByPk(userId);
		user.destroy();
		return { ok: true };
	},
};
