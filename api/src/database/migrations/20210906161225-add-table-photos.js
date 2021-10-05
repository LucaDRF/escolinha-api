module.exports = {
	up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable('imagens', {
				id: {
					type: Sequelize.INTEGER,
					autoIncrement: true,
					primaryKey: true,
					allowNull: false,
				},
				originalname: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				filename: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				aluno_id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: {
							tableName: 'alunos',
						},
						key: 'id',
					},
				},
				created_at: {
					type: Sequelize.DATE,
					allowNull: false,
				},
				updated_at: {
					type: Sequelize.DATE,
					allowNull: false,
				},
			});

			await transaction.commit();
		} catch (e) {
			await transaction.rollback();
			throw e;
		}
	},

	down: async (queryInterface) => queryInterface.dropTable('imagens'),

};
