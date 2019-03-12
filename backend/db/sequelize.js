const Sequelize = require('sequelize');
const sequelize = new Sequelize({
	database: 'pizzaria',
	username: 'root',
	password: null,
	dialect: 'mysql',
	host: 'localhost',
	port: 3600,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
});

module.exports = sequelize;