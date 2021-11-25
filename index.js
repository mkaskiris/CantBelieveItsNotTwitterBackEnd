const server = require('./server')
const port = 'http://www.cantbelieveitsnottwitter.herokuapp.com';

server.listen(port, () => console.log(`${port}`))