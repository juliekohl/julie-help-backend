import app from './app'
const port = process.env.APP_PORT;

/**
 * Start Server
 */

app.listen(port, () => console.log(`API listening on port ${port}!`));
