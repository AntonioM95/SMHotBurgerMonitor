const express = require('express');
const app = express();
const port = 5000;
const fs = require('fs');

app.get('/gettotal', (req, res) => {
    res.send('The total is: ');
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