var connect = require('connect');
connect.createServer(
    connect.static(__dirname)
).listen(1337);