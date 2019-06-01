import React from "react";
import PopUpUsername from '../PopUpUsername';
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
      open: true
    };
  }


  componentDidMount() {
    //this.props.history.push('/'); //to change url
    socket.on('new_message', (data) => {
      console.log(data);
    })
    socket.on('typing', (data) => {
      console.log(data);
    })
    socket.on('new_user', (data) => {
      console.log(data);
    })
  }

  _onSend = () => {
    if(this.state.input !== '') {
      var msg = {
        stream: 'stream',
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

  _onChangeText = (evt) => {
    this.setState({input: evt.target.value});
    socket.emit('typing', this.state.username);
  }

  _onChangeUsername = (evt) => {
    this.setState({ username: evt.target.value });
  }

  render() {
    return (
      <div className="messenger">
        <PopUpUsername
          open={this.state.open}
          handleValid={this._handleValidUsername}
          onChangeUsername={this._onChangeUsername}
        />
        <div className="scrollable sidebar">
          <ConversationList
            conversations={this.state.conversations}
          />
        </div>
        <div className="scrollable content">
          <MessageList
            messages={this.state.messages}
            uid={this.state.username}
            onSendMessage={this._onSend}
            input={this.state.input}
            onChangeMessage={this._onChangeText}
          />
        </div>
      </div>
    )
  }

}
