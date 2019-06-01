const app = require('express')();
const cors = require('cors');
const redis = require("redis");
const bodyParser  = require('body-parser');
const socket = require('socket.io');
const expressPort = 8000;
const client = redis.createClient({host: 'redis', port: 6379});

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({success: true, message: 'api is working'});
})

app.post('/join', (req, res) => {
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

app.post('/leave', (req, res) => {
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

app.get('/members/:channel', (req, res) => {
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

app.post('/send', (req, res) => {
  if(!req.body) {
    res.json({success: false, message: 'no body'});
    return;
  }
  let stream = req.body.stream || 'stream';
  let field = req.body.field || 'data';
  let data = JSON.stringify(req.body);
  client.xadd(stream, '*', field, data, (err, result) => {
    if(err) {
      //console.log(err)
      res.json({success: false, message: err});
    } else {
      //console.log(result)
      res.json({success: true, result: result});
    }
  });
});

app.get('/messages/:stream', (req, res) => {
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

app.get('/total/:stream', (req, res) => {
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

const server = app.listen(expressPort, () => console.log(`Express app is listening on port ${expressPort}!`));

const io = socket(server);

io.on('connection', (socket) => {

  socket.on('send', (msg) => {
      //console.log(msg);
      socket.broadcast.emit('new_message', msg);
  });

  socket.on('typing', (data) => {
      io.emit('typing', data);
  });

  socket.on('new_user', (data) => {
      socket.broadcast.emit('new_user', data);
  });
});
