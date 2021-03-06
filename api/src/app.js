import express from 'express';
import { resolve } from 'path';
import cors from 'cors';
import routes from './routes/routes';

import './database';

class App {
	constructor() {
		this.server = express();
		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.server.use(cors());
		this.server.use(express.json());
		this.server.use(express.static(resolve(__dirname, '..', 'uploads')));
	}

	routes() {
		this.server.use(routes);
	}
}

export default new App().server;
