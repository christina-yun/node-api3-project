const server = require ('./api/server');

server.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});