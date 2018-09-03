var express = require('express'),
app = express(),  
server = require('http').createServer(app),  
bodyParser = require('body-parser'),
querystring=require('querystring'),
https=require('https');
const {Wit, log} = require('node-wit');
app.use(express.static(__dirname));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post('/details', (req, res,next) =>{  
console.log('req is ',req.body);
temp='';
res.setHeader('Access-Control-Allow-Origin', '*');
    const client = new Wit({
		accessToken: 'R64XRDNFFWBICSQRLNDRPKHAIGUG2QZ5',
	});
	//logger: new log.Logger(log.DEBUG) // optional
	client.message('Insert an Opportunity with name as maddy, close date as 9/1/2018').then((data) => {
	  console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
	  res.send(JSON.stringify(data));
			res.end();
	});
	
});

server.listen(process.env.PORT || 4040); 
