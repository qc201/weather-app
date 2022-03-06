const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res) => {
    // 这是+ 别再犯2了啊！！！
    res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res)=>{
    var userInput = req.body.cityName;
    url = 'https://api.openweathermap.org/data/2.5/weather?q='+ userInput+'&appid=6e3151e3ca4c1b24e1ba8a6d3d3d380e&units=metric';
    https.get(url, (response)=>{
        response.on('data', (data)=>{
            var jsonData = JSON.parse(data);
            var temp = jsonData.main.temp;
            var sky = jsonData.weather[0].main;
            icon = jsonData.weather[0].icon;
            // https://openweathermap.org/img/wn/10d@2x.png
            iconEndpoint = 'https://openweathermap.org/img/wn/'
            iconUrl = iconEndpoint + icon + '@2x.png'
            res.write('<h1>the temperature in '+userInput+' is ' + temp+ '<br> the sky is '+ sky + '.</h1>');
            res.write('<img src='+iconUrl +'>');
            res.send();
        })
    });

});
app.listen(3000, ()=>{
    console.log('listenming from port 3000...');
});

