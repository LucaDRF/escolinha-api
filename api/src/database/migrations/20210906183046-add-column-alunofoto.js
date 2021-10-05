module.exports = {
	up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.addColumn('alunos', 'foto_id', {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: {
						tableName: 'imagens',
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

	down: async (queryInterface) => queryInterface.removeColumn('alunos', 'foto_id'),
};
