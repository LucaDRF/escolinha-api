import Sequelize, { Model } from 'sequelize';
import appConfig from '../../config/appConfig';

class Imagem extends Model {
	static init(sequelize) {
		super.init({
			originalname: Sequelize.STRING,
			filename: Sequelize.STRING,
			aluno_id: Sequelize.INTEGER,
			url: {
				type: Sequelize.VIRTUAL,
				get() {
					return `${appConfig.url}/images/${this.filename}`;
				},
			},
		}, {
			sequelize,
			tableName: 'imagens',
		});
		return this;
	}

	static associate(models) {
		this.belongsTo(models.Aluno, {
			foreignKey: 'aluno_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
	}
}

export default Imagem;
