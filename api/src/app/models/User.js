import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				nome: Sequelize.STRING,
				email: Sequelize.STRING,
				password_hash: Sequelize.STRING,
				password: Sequelize.VIRTUAL,
			},
			{
				sequelize,
				tableName: 'users',
			},
		);

		this.addHook('beforeSave', async (user) => {
			if (user.password) {
				user.password_hash = await bcryptjs.hash(user.password, 8);
			}
		});

		return this;
	}

	checkPassword(password) {
		return bcryptjs.compare(password, this.password_hash);
	}
}

export default User;
