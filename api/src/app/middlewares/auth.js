import * as jwt from 'jsonwebtoken';
import auth from '../../config/auth';

export default {
	async autentication(req, res, next) {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return res.status(400).json({ error: 'Token não colocado' });
		}

		const [, token] = authHeader.split(' ');

		try {
			const dados = jwt.verify(token, auth.secret);
			const { id, email } = dados;

			req.userId = id;
			req.userEmail = email;
			return next();
		} catch (e) {
			return res.status(401).json({ error: 'Token inválido ou inalterado' });
		}
	},
};
