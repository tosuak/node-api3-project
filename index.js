const server = require('./api/server');

const PORT = 9000;

server.listen(PORT, () => {
  console.log(`\nListening on server ${PORT}\n`);
});
