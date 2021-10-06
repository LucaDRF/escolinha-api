import jwt from 'jsonwebtoken';
import User from '../models/User';
import auth from '../../config/auth';

export default {
	async loginService(email, password) {
		const user = await User.findOne({
			where: { email },
		});

		if (!user) {
			throw new Error('Email ou senha inválidos');
		}

		const { id, nome } = user;

		if (!(await user.checkPassword(password))) {
			throw new Error('Email ou senha inválidas');
		}

		const token = jwt.sign({ id, email }, auth.secret, {
			expiresIn: auth.expiration,
		});
		return { nome, email, token };
	},
};
