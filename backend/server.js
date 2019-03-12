const app = require('./index');
const logger = require('./logger');

const port = process.env.PORT || 9000;

app.listen(port, () => {
	logger.info(`Server is up at port ${port}!`);
});