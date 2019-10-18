const express = require('express')
const app = express()
const port = 3000
let path = require('path');

app.use('/assets', express.static('assets'))
app.use('/components', express.static('components'))
app.use('/js', express.static('js'))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))