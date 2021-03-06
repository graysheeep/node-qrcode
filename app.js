var express = require('express')
var qr = require('qr-image')
var JsBarcode = require('jsbarcode');
var Canvas = require('canvas');
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/create_qrcode', function (req, res, next) {
    var text = req.query.text;
    try {
        var img = qr.image(text, {size: 10, margin: 0});
        res.writeHead(200, {'Content-Type': 'image/png'});
        img.pipe(res);
    } catch (e) {
        res.writeHead(414, {'Content-Type': 'text/html'});
        res.end('<h1>414 Request-URI Too Large</h1>');
    }
})

app.get('/create_barcode', function (req, res, next){
    var text = req.query.text;
    try {
	var canvas = new Canvas(200, 50);
	JsBarcode(canvas, text);
	var img = canvas.pngStream();
	res.writeHead(200, {'Content-Type': 'image/png'});
        img.pipe(res);
    } catch (e) {
	res.writeHead(414, {'Content-Type': 'text/html'});
	res.end('<h1>414 Request-URI Too Large</h1>');
    }
})

app.listen(3002)
console.log('listening on port 3002')
