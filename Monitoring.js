const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');

const Monitoring = {
    total: 0,
    topSeller: {
        Soda: 0,
        Hamburger: 0,
        Hotdog: 0,
        Cookie: 0
    },
    requestCount: 0,
    lastRequestStatus: null,
    lastRequestTime: null,
    lastLine: 0 
}

getLastTimeRequest = () => {
    const data = fs.readFileSync('./Monitoring/monitoring.log', 'utf8');
    var lines = data.split("\n");
    lastLine = lines[lines.length - 2].split(" ");
    console.log(lines, lastLine);
    Monitoring.lastRequestTime = lastLine[lastLine.length - 2];
    console.log(Monitoring.lastRequestTime);
}
getTotal = () => {
    const data = fs.readFileSync('./Monitoring/monitoring.log', 'utf8');
    var lines = data.split("\n");
    console.log(lines.length);
    if(lines.length > Monitoring.lastLine){
        lines.forEach((line) => {
        const log = line.split(" ");
        if(log[3] === "Purchase") {
            const cost = log[10].replace('$','');
            const price = log[8] * cost;
            Monitoring.total += price;
        }
        });
    }
    Monitoring.lastLine = lines.length;
}


getTopSeller = () => {
    const data = fs.readFileSync('./Monitoring/monitoring.log', 'utf8');
    var lines = data.split("\n");
    if(lines.length > Monitoring.lastLine){
        lines.forEach((line) => {
        const log = line.split(" ");
         if(log[3] === "Purchase") {
            const item = Object.keys(Monitoring.topSeller).filter((key, index) => {
                if(key.toString().toLowerCase() === log[6].toString().toLowerCase()){
                    return key
                };
            });
            
            Monitoring.topSeller[item] += log[8];
           }
         });
    }
    Monitoring.lastLine = lines.length;

}
app.get('/gettotal', (req, res) => {
    getTotal();
    const sales = `Total Earnings $${Monitoring.total.toString()}`
    res.send(sales);
}
);


app.get('/gettopseller', (req, res) => {

    getTopSeller();
    //const topSeller = `Top Seller is $${Monitoring.total.toString()}`
    res.json(Monitoring.topSeller);
   }
);

app.get('/getrequestcount', (req, res) => {
    res.send(`The request count is: ${Monitoring.lastLine}`);
   }
);

app.get('/getlastrequeststatus', (req, res) => {
    res.send('The last request status was: ');
   }
);


app.get('/getlastrequesttime', (req, res) => {
    getLastTimeRequest();

    res.send(`The last request time is: ${Monitoring.lastRequestTime}`);
   }
);

app.listen(port, () => console.log(`A new connection has been made`));