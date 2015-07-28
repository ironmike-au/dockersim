var connect = require('connect');
var serveStatic = require('serve-static');

function addMyHeaders(req, res, next){
  //res.setHeader("Access-Control-Allow-Origin", "*");
  //res.setHeader("X-WTF", "http://docker-vm:8000");
  next();
}

connect()
    .use(addMyHeaders)
    .use(serveStatic(__dirname))
    .listen(8000);

