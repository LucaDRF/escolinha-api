import jwt from 'jsonwebtoken';
import User from '../models/User';
import auth from '../../config/auth';

export default {
	async login(req, res) {
		const { email, password } = req.body;
		const user = await User.findOne({
			where: { email },
		});

		const { id, nome } = user;

		if (!user) {
			return res.status(400).json({ error: 'Email ou senha inválidos' });
		}

		if (!(await user.checkPassword(password))) {
			return res.status(400).json({ error: 'Email ou senha inválidas' });
		}

		const token = jwt.sign({ id, email }, auth.secret, {
			expiresIn: auth.expiration,
		});

		return res.json({ nome, email, token });
	},
};
