const http = require('http')
const fs = require('fs')
var request = require('request')

const api = 'https://api.openweathermap.org/data/2.5/weather?q=peshawar&units=metric&appid=342498a8c56ed5f7e3f219ebbb2305ab'
const home = fs.readFileSync('./home.html', 'utf-8');

const replaceVal = (tempVal, origVal) => {
    let temperature = tempVal.replace("{%tempval%}", origVal.main.temp);
    temperature = temperature.replace("{%tempmin%}", origVal.main.temp_min);
    temperature = temperature.replace("{%tempmax%}", origVal.main.temp_max);
    temperature = temperature.replace("{%location%}", origVal.name);
    temperature = temperature.replace("{%country%}", origVal.sys.country);
    temperature = temperature.replace("{%tempstatus%}", origVal.weather[0].main);

    return temperature;
};

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        const request = require('request');
        request(api, function (error, response, body) {
        })
        .on('data', (chunk) => {
            const objData = JSON.parse(chunk)
            const arrData = [objData]
            // res.end(chunk.toString())
            // console.log(arrData[0].main.temp)

            const realTimeData = arrData.map((val) => replaceVal(home, val)).join("")

            res.write(realTimeData)
        })
        .on('end', (err) => {
            if(err) return console.log('connection closed due t error', err)
            // console.log('end')
        })
    }
})

server.listen(3000, 'localhost')