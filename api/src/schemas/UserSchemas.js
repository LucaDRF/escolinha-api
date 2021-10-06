import * as Yup from 'yup';

export default {
	async storeValidation(req, res, next) {
		const schema = Yup.object().shape({
			nome: Yup.string().required(),
			email: Yup.string().email().required(),
			password: Yup.string().required().min(6),
		});

		try {
			req.data = await schema.validate(req.body);
			return next();
		} catch (error) {
			return res.status(400).json({ error: 'Erro na validação' });
		}
	},

	async updateValidation(req, res, next) {
		const schema = Yup.object().shape({
			nome: Yup.string(),
			email: Yup.string().email(),
			oldPassword: Yup.string(),
			password: Yup.string().min(6)
				.when('oldPassword', (oldPassword, field) => (oldPassword ? field.required() : field)),
			confirmPassword: Yup.string()
				.when('password', (password, field) => (password ? field.required().oneOf([password]) : field)), // oneOf // matches
		});
		try {
			req.data = await schema.validate(req.body);
			return next();
		} catch (error) {
			return res.status(401).json({ error: 'Falha na validação' });
		}
	},
};
