const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser  = require('body-parser');
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({error: err, success: false});
})

app.post('/', (req, res) => {
  console.log(req.body);
  if(req.body) {
    res.json({error: err, success: false});
  } else {
    res.json({error: 'no body', success: false});
  }

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
