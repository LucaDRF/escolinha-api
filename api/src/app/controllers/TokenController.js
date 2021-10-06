import TokenServices from '../services/TokenServices';

export default {
	async login(req, res) {
		try {
			const data = await TokenServices.loginService(req.body.email, req.body.password);
			return res.json(data);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};
