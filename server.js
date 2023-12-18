const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middelwares = jsonServer.defaults();

server.use(middelwares);
server.use(router);
server.listen(3000, () => {
    console.log('Json server is running');
});
