const express = require('express');
const app = express()
const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`listening to http://localhost:${port}`))

