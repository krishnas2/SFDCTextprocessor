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
/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/

var dataops=(data)=>{
//console.log('databv bvbv          ',data);
		//console.log(data['entities']['object'][0]['value'],data['entities']['operation'][0]['value'],data['entities']['info'][0]['value']);
		var temp={},vals=[];
		temp['object']=data['entities']['object'][0]['value'];
		temp['operation']=data['entities']['operation'][0]['value'];
		//temp['raw_result']=data;
		var loc=data['entities']['info'][0]['value'].split(',');
		for(var i=0;i<loc.length;i++){
			if (i==0)
			{
				loc[i]=loc[i].replace(/(with|having|With|Having)/i, '').trim();
			}
			loc[i]=loc[i].replace(/( as)/i, '').trim();
			vals=loc[i].split(' ');
			temp[vals[0]]=vals[1];
		}
		//console.log('temp is      ' ,temp);
		return temp;
	};
app.post('/details', (req, res,next) =>{  
console.log('req is ',req.body.query);
temp='';
//res.setHeader('Access-Control-Allow-Origin', '*');
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const client = new Wit({
		accessToken: 'R64XRDNFFWBICSQRLNDRPKHAIGUG2QZ5',
	});
	//logger: new log.Logger(log.DEBUG) // optional
	client.message(req.body.query).then((data) => {
	  console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
	  if(!data['entities']['operation'] ){
		 res.send(JSON.stringify({'raw_resp':data,'lookup':'DB Operation is missing. Ex: Create,Update,Insert etc..'}));
	  }
	  else if(!data['entities']['object']){
		  res.send(JSON.stringify({'raw_resp':data,'lookup':'DB Object is missing. Ex: Opportunity,Account,Contact etc..'}));
	  }
	  else{
	  res.send(JSON.stringify(dataops(data)));}
			res.end();
	});
	
});

server.listen(process.env.PORT || 4040); 
