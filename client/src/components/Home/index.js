import React from "react";
import PopUpUsername from '../DialogSelect';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Home.css';
import axios from 'axios';

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
    this.setState(prevState => {
      return {
        ...prevState,
        messages: [
          {
            id: 1,
            author: 'apple',
            message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
            timestamp: new Date().getTime()
          },
          {
            id: 2,
            author: 'orange',
            message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
            timestamp: new Date().getTime()
          },
          {
            id: 3,
            author: 'orange',
            message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
            timestamp: new Date().getTime()
          },
          {
            id: 4,
            author: 'apple',
            message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
            timestamp: new Date().getTime()
          },
          {
            id: 5,
            author: 'apple',
            message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
            timestamp: new Date().getTime()
          },
          {
            id: 6,
            author: 'apple',
            message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
            timestamp: new Date().getTime()
          },
          {
            id: 7,
            author: 'orange',
            message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
            timestamp: new Date().getTime()
          },
          {
            id: 8,
            author: 'orange',
            message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
            timestamp: new Date().getTime()
          },
          {
            id: 9,
            author: 'apple',
            message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
            timestamp: new Date().getTime()
          },
          {
            id: 10,
            author: 'orange',
            message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
            timestamp: new Date().getTime()
          },
        ]
      };
    });
    axios.get('https://randomuser.me/api/?results=20').then(response => {
      this.setState(prevState => {
        let conversations = response.data.results.map(result => {
          return {
            photo: result.picture.large,
            name: `${result.name.first} ${result.name.last}`,
            text: 'Hello world! This is a long message that needs to be truncated.'
          };
        });

        return { ...prevState, conversations };
      });
    });
  }

  _onSend = () => {
    console.log('sisi');
  }

  _onChangeText = (evt) => {
    //console.log(evt.target.value)
    this.setState({input: evt.target.value});
  }

  _handleValidUsername = () => {
    this.setState({ open: !this.state.open });
  }

  _onChangeUsername = (evt) => {
    //console.log(evt.target.value)
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
            uid={'apple'}
            onSendMessage={this._onSend}
            onChangeMessage={this._onChangeText}
          />
        </div>
      </div>
    )
  }

}
