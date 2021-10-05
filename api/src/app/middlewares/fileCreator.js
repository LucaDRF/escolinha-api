import { extname } from 'path';
import multer from 'multer';
import fs from 'fs';
import multerConfig from '../../config/multer';

const upload = multer(multerConfig).single('img');

export default {
	create(req, res, next) {
		return upload(req, res, async (err) => {
			const { img, originalname, aluno_id } = req.body;
			let base64Data = '';
			if (img.substring(11, 14) === 'jpg') {
				base64Data = img.replace(/^data:image\/jpg;base64,/, '');
			}
			if (img.substring(11, 14) === 'jpe') {
				base64Data = img.replace(/^data:image\/jpeg;base64,/, '');
			}
			if (img.substring(11, 14) === 'png') {
				base64Data = img.replace(/^data:image\/png;base64,/, '');
			}

			const filename = originalname.substring(0, 4) + Date.now() + extname(originalname);
			req.body = { filename, originalname, aluno_id };
			fs.writeFile(`uploads/images/${filename}`, base64Data, 'base64', (error) => {
				if (error) {
					return res.json({ Error: error, Message: 'Erro ao fazer upload de imagem' });
				}
				return '';
			});
			if (err) {
				return res.status(400).json({ errors: [err] });
			}

			return next();
		});
	},

};
