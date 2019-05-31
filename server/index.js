const express = require('express');
const app = express();
const cors = require('cors');
const redis = require("redis");
const bodyParser  = require('body-parser');
const port = 8000;
const client = redis.createClient({host: '127.0.0.1', port: 6379});


app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  console.log(client);
  res.json({error: 'err', success: false});
})

app.post('/', (req, res) => {
  console.log(req.body);
  if(req.body) {
    res.json({error: 'err', success: false});
  } else {
    res.json({error: 'no body', success: false});
  }

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
