import React from "react";
import PopUpUsername from '../PopUpUsername';
import PopUp from '../PopUp';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Home.css';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:8000');

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    //console.log(props);
    this.state = {
      messages: [],
      conversations: [],
      input: '',
      open: true,
      num_tot_message: 0,
      username: '',
      username_typing: '',
      openWatson: false,
      loadingWatson: false
    };
  }


  componentDidMount () {
    //this.props.history.push('/'); //to change url
    socket.on('new_message', (data) => {
      console.log(data);
      var arr = this.state.messages;
      arr.push(data);
      this.setState({messages: arr});
    })
    socket.on('typing', (data) => {
      console.log(data);
      this.setState({username_typing: data});
    })
    socket.on('new_user', (data) => {
      console.log(data);
      var arr = this.state.conversations;
      arr.push({name: data});
      this.setState({conversations: arr});
    })
    socket.on('bye_user', (data) => {
      console.log(data);
      var arr = this.state.conversations;
      arr = this.removeByAttr(arr, 'name', data.username);
      this.setState({conversations: arr});
    })
    socket.on('notif', (data) => {
      console.log(data);
      if(data.receiver === this.state.username) {
          alert(data.sender+' sent you a poke');
      }
    })
    axios.get('http://localhost:8000/members/channel').then(response => {
      if(response.data.success) {
        var arr = [];
        for(var i = 0; i< response.data.result.length; i++) {
          arr.push({name: response.data.result[i]})
        }
        this.setState({conversations: arr});
      }
    });
    axios.get('http://localhost:8000/messages/stream').then(response => {
      //console.log(response.data);
      if(response.data.success) {
        var arr = [];
        for(var i = 0; i< response.data.result.length; i++) {
          for(var j = 0; j < response.data.result[i].length; j++) {
            //console.log(response.data.result[i][j]);
            var data = JSON.parse(response.data.result[i][j][1]);
            if(data.field) {
              arr.push({author: data.author, message: data.message, timestamp: data.timestamp});
            }
          }
        }
        this.setState({messages: arr});
      }
    });
    axios.get('http://localhost:8000/total/stream').then(response => {
      if(response.data.success) {
        this.setState({num_tot_message: response.data.result});
      }
    });
    this.setupBeforeUnloadListener();
  }

  removeByAttr = (arr, attr, value) =>{
    var i = arr.length;
    while(i--){
       if(arr[i]
           && arr[i].hasOwnProperty(attr)
           && arr[i][attr] === value
         ){

           arr.splice(i,1);

       }
    }
    return arr;
  }

  setupBeforeUnloadListener = async () => {
      window.addEventListener("beforeunload", (ev) => {
          ev.preventDefault();
          socket.emit('bye_user', {username: this.state.username, channel: 'channel'});
          return;
      });
  };

  _onSend = () => {
    if(this.state.input !== '') {
      var msg = {
        stream: 'stream',
        field: 'field',
        author: this.state.username,
        message: this.state.input,
        timestamp: new Date().getTime()
      }
      socket.emit('send', msg);
      axios.post('http://localhost:8000/send', msg).then(response => {
        console.log(response);
      });
      var arr = this.state.messages;
      arr.push(msg);
      this.setState({messages: arr, input: ''});
    }
  }

  _handleValidUsername = () => {
    if(this.state.username !== '') {
      socket.emit('new_user', this.state.username);
      axios.post('http://localhost:8000/join', {
        channel: 'channel',
        username: this.state.username
      }).then(response => {
        console.log(response);
      });
      var arr = this.state.conversations;
      arr.push({name: this.state.username});
      this.setState({open: !this.state.open, conversations: arr});
    }
  }

  _handleValidWatson = () => {
    this.setState({openWatson: false, messageWatson: ''});
  }

  _onChangeText = (evt) => {
    this.setState({input: evt.target.value});
    socket.emit('typing', this.state.username);
  }

  _onChangeUsername = (evt) => {
    this.setState({ username: evt.target.value });
  }

  _onClickItem = (conv) => {
    if(conv.name !== this.state.username) {
      socket.emit('notif', {sender: this.state.username, receiver: conv.name});
    } else {
      alert('You cannot send a poke to yourself');
    }
  }

  _onClickMessage = (i) => {
    //console.log(this.state.messages[i]);
    this.setState({loadingWatson: true, openWatson: true});
    axios.post('http://localhost:8000/tone', {
      message: this.state.messages[i].message
    }).then(response => {
      var message = '';
      console.log(response.data);
      if(response.data.success && response.data.result.document_tone.tones[0]) {
        message = "According to Watson, this message belongs to : " + response.data.result.document_tone.tones[0].tone_name + ", the accuracy is "+response.data.result.document_tone.tones[0].score +"%.";
      } else {
        message = 'Things don\'t appear to be working at the moment. Please try again later.';
      }
      this.setState({loadingWatson: false, messageWatson: message});
    });
  }

  render() {
    return (
      <div className="messenger">
        <PopUpUsername
          open={this.state.open}
          handleValid={this._handleValidUsername}
          onChangeUsername={this._onChangeUsername}
        />
        <PopUp
          open={this.state.openWatson}
          loading={this.state.loadingWatson}
          message={this.state.messageWatson}
          handleValid={this._handleValidWatson}
        />
        <div className="scrollable sidebar">
          <ConversationList
            conversations={this.state.conversations}
            onClickItem={this._onClickItem}
          />
        </div>
        <div className="scrollable content">
          <MessageList
            messages={this.state.messages}
            uid={this.state.username}
            onSendMessage={this._onSend}
            input={this.state.input}
            onChangeMessage={this._onChangeText}
            onClickMessage={this._onClickMessage}
          />
        </div>
      </div>
    )
  }

}
