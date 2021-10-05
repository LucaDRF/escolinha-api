import multer from 'multer';
import { extname, resolve } from 'path';

export default {
	fileFilter: (req, file, cb) => {
		console.log(file.mimetype);
		if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
			return cb(new multer.MulterError('Extensão não suportada'));
		}

		return cb(null, true);
	},
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
		},
		filename: (req, file, cb) => {
			cb(null, `${Date.now()}${extname(file.originalname)}`);
		},
	}),
};
