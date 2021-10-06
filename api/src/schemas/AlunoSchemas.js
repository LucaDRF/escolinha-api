import * as Yup from 'yup';

export default {
	async storeValidation(req, res, next) {
		const {
			nome, sobrenome, email, altura, peso,
		} = req.body;

		const user_creator = req.userId;
		const schema = Yup.object().shape({
			nome: Yup.string().required(),
			sobrenome: Yup.string().required(),
			email: Yup.string().required().email(),
			altura: Yup.number().required(),
			peso: Yup.number().required(),
		});

		const isValid = await schema.isValid({
			nome, sobrenome, email, altura, peso,
		});

		if (!isValid) {
			return res.status(401).json({ error: 'Erro na validação' });
		}

		req.data = {
			nome, sobrenome, email, altura, peso, user_creator,
		};

		return next();
	},

	async updateValidation(req, res, next) {
		const schema = Yup.object().shape({
			nome: Yup.string(),
			sobrenome: Yup.string(),
			email: Yup.string().email(),
			altura: Yup.number().positive(),
			peso: Yup.number().positive(),
		});

		const isValid = await schema.isValid(req.body);

		if (!isValid) {
			return res.status(401).json({ error: 'Erro na validação' });
		}

		req.data = req.body;
		return next();
	},
};
