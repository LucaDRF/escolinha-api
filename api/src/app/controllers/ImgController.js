import ImagemServices from '../services/ImagemServices';

export default {
	async store(req, res) {
		try {
			const foto = await ImagemServices.storeService(req.body);
			return res.json(foto);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	async update(req, res) {
		try {
			const foto = await ImagemServices.updateService(req.body);
			return res.json(foto);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	async delete(req, res) {
		try {
			return ImagemServices.deleteService(req.params.alunoId);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};
