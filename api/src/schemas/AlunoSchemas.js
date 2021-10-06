import * as Yup from 'yup';

export default {
	async storeValidation(req, res, next) {
		const schema = Yup.object().shape({
			nome: Yup.string().required(),
			sobrenome: Yup.string().required(),
			email: Yup.string().required().email(),
			altura: Yup.number().required(),
			peso: Yup.number().required(),
		});

		try {
			req.data = await schema.validate(req.body);
			return next();
		} catch (error) {
			return res.status(401).json({ error: 'Erro na validação' });
		}
	},

	async updateValidation(req, res, next) {
		const schema = Yup.object().shape({
			nome: Yup.string(),
			sobrenome: Yup.string(),
			email: Yup.string().email(),
			altura: Yup.number().positive(),
			peso: Yup.number().positive(),
		});

		try {
			req.data = await schema.validate(req.body);
			return next();
		} catch (error) {
			return res.status(401).json({ error: 'Erro na validação' });
		}
	},
};
