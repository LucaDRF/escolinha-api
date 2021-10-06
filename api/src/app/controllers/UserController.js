import UserServices from '../services/UserServices';

export default {
	async store(req, res) {
		try {
			const { id, nome, email } = await UserServices.storeUser(req.data);
			return res.json({ id, nome, email });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	async show(req, res) {
		try {
			const user = await UserServices.showUser(req.userId);
			return res.json(user);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	async update(req, res) {
		try {
			req.data.userId = req.userId;
			const data = await UserServices.updateUser(req.data);
			return res.json(data);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	async delete(req, res) {
		try {
			await UserServices.deleteUser(req.userId);
			return res.json({ ok: true });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};
