const Sequelize = require('sequelize');
const logger = require('../logger');

const sequelize = new Sequelize({
	database: 'pizzaria',
	username: 'root',
	password: null,
	logging: false,
	dialect: 'mysql',
	host: 'localhost',
	port: 3306,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
});

sequelize.sync().then(()=>{
	logger.info('Connection established successfully');
});

module.exports = sequelize;