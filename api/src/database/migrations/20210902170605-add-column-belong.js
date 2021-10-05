module.exports = {
	up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.addColumn('alunos', 'user_creator', {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: {
						tableName: 'users',
					},
					key: 'id',
				},
			});

			await transaction.commit();
		} catch (e) {
			await transaction.rollback();
			throw e;
		}
	},

	down: async (queryInterface) => queryInterface.removeColumn('alunos', 'user_creator'),
};
