const app = require('express')();
const cors = require('cors');
const redis = require("redis");
const bodyParser  = require('body-parser');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const expressPort = 8000;
const client = redis.createClient({host: '127.0.0.1', port: 6379});

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({success: true, message: 'api is working'});
})

app.post('/join', async (req, res) => {
    if(!req.body) {
      res.json({success: false, message: 'no body'});
      return;
    }
    let channel = req.body.channel || 'channel';
    let username = req.body.username || 'username';
    client.sadd(channel, username, (err, result) => {
      if(err) {
        //console.log(err)
        res.json({success: false, message: err});
      } else {
        //console.log(result)
        res.json({success: true, result: result});
      }
    });
});

app.post('/leave', async (req, res) => {
  if(!req.body) {
    res.json({success: false, message: 'no body'});
    return;
  }
  let channel = req.body.channel || 'channel';
  let username = req.body.username || 'username';
  client.srem(channel, username, (err, result) => {
    if(err) {
      //console.log(err)
      res.json({success: false, message: err});
    } else {
      //console.log(result)
      res.json({success: true, result: result});
    }
  });
});

app.get('/members/:channel', async (req, res) => {
  let channel = req.params.channel;
  client.smembers(channel, (err, result) => {
    if(err) {
      //console.log(err)
      res.json({success: false, message: err});
    } else {
      //console.log(result)
      res.json({success: true, result: result});
    }
  });
});

app.get('/send', async (req, res) => {
  if(!req.body) {
    res.json({success: false, message: 'no body'});
    return;
  }
  let stream = req.body.stream || 'stream';
  let username = req.body.username || 'username';
  let message = req.body.message || 'message';
  client.xadd(stream, '*', username, message, (err, result) => {
    if(err) {
      //console.log(err)
      res.json({success: false, message: err});
    } else {
      //console.log(result)
      res.json({success: true, result: result});
    }
  });
});

app.get('/messages/:stream', async (req, res) => {
  if(!req.body) {
    res.json({success: false, message: 'no body'});
    return;
  }
  let stream = req.params.stream;
  client.xrange(stream, '-', '+', (err, result) => {
    if(err) {
      //console.log(err)
      res.json({success: false, message: err});
    } else {
      //console.log(result)
      res.json({success: true, result: result});
    }
  });
});

app.get('/total/:stream', async (req, res) => {
  let stream = req.params.stream;
  client.xlen(stream, (err, result) => {
    if(err) {
      //console.log(err)
      res.json({success: false, message: err});
    } else {
      //console.log(result)
      res.json({success: true, result: result});
    }
  });
});

app.listen(expressPort, () => console.log(`Express app is listening on port ${expressPort}!`));

io.on('connection', (socket) => {
  console.log('A user is connected to socket.io')
  socket.on('message', () => {
    console.log('obj');
  });
});
