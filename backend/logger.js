const winston = require('winston');
const format = winston.format;


const myFormat = format.printf(({
	level,
	message,
	timestamp
}) => {
	return `${level}: ${message} - ${timestamp}`;
});

const logger = winston.createLogger({
	level: 'info',
	format: format.combine(myFormat, format.timestamp()),
	defaultMeta: {
		service: 'user-service'
	},
	transports: [
		new winston.transports.File({
			filename: 'error.log',
			level: 'error'
		}),
	]
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console({
		format: myFormat
	}));
}

module.exports = logger;