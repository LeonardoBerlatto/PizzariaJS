const app = require('./index');

const port = process.env.PORT || 9000;

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Server is up at port ${port}!`);
});