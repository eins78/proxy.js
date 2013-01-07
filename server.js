/*
    SIMPLE PROXY SERVICE
    ====================
    
    - gets config from JSON
    - home page with service listing

*/

var net         = require('net')
  , http        = require('http')
  , httpProxy   = require('http-proxy')
  , mu          = require('mu2')
  , util        = require('util');

var configData =
{
  "proxies" : [
    {
      "name" : "Proxy Service Listing",
      "hostname" : "www.127.0.0.1.xip.io",
      "remote" : "127.0.0.1:5000"
    },
    {
      "name" : "Sickbeard",
      "hostname" : "sb.127.0.0.1.xip.io",
      "remote" : "xbmc.ali:8081"
    }
  ]
};

var routerData = {}
  , routerList = {};

routerData.router = routerList;

var FAKErouterData = 
{
  router: {
      'www.127.0.0.1.xip.io': '127.0.0.1:5000',
      'sb.127.0.0.1.xip.io': 'naspi.ali:8081'
    }
};

//
// Http Proxy Server with Proxy Table
//
httpProxy.createServer(FAKErouterData).listen(80);
console.info('Proxy Server running at Port 80');

//
// Built-in HTTP Server for Service listing
//

http.createServer(function (req, res) {
  var stream = mu.compileAndRender('index.mustache', configData);
  util.pump(stream, res);
  util.log('Served index.html');
}).listen(5000, '127.0.0.1');
console.info('Directory Listing Server running at http://127.0.0.1:5000/');

//
// Telnet Interface
//

var server = net.createServer(function (socket) {
	socket.write('Welcome to the Telnet server!');
}).listen(8888);