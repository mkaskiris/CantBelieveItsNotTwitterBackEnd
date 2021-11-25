const server = require('./server')
const port = process.env.PORT || 3010;

server.listen(port, () => console.log(`Starting on http://localhost:${port}`))