import Sequelize, { Model } from 'sequelize';

class Aluno extends Model {
	static init(sequelize) {
		super.init({
			nome: Sequelize.STRING,
			sobrenome: Sequelize.STRING,
			email: Sequelize.STRING,
			peso: Sequelize.FLOAT,
			altura: Sequelize.FLOAT,
			user_creator: Sequelize.INTEGER,
			foto_id: Sequelize.INTEGER,
		}, {
			sequelize,
			tableName: 'alunos',
		});
		return this;
	}

	static associate(models) {
		this.belongsTo(models.User, {
			foreignKey: 'user_creator',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		});
		this.hasOne(models.Imagem, {
			foreignKey: 'aluno_id',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		});
	}
}

export default Aluno;
