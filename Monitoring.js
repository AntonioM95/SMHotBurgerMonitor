const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');

const Monitoring = {
    total: 0,
    topSeller: null,
    requestCount: 0,
    lastRequestStatus: null,
    lastRequestTime: null
}




app.get('/gettotal', (req, res) => {
    fs.readFile('./Monitoring/monitoringlogs.log', 'utf8', (err,data) => {
        if(err){
            console.log(err);
            throw err;
        }
        res.send(data.toString());
    //res.send('The total is: ');
   });
}
);

app.get('/gettopseller', (req, res) => {
    res.send('The top seller is: ');
   }
);

app.get('/getrequestcount', (req, res) => {
    res.send('The request count is: ');
   }
);

app.get('/getlastrequeststatus', (req, res) => {
    res.send('The last request was: ');
   }
);

app.get('/getlastrequesttime', (req, res) => {
    res.send('The last request time is: ');
   }
);

app.listen(port, () => console.log(`A new connection has been made`));