import React, { Component } from 'react';
import Compose from '../Compose';
import Message from '../Message';
import moment from 'moment';
import './MessageList.css';

export default class MessageList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages,
      uid: props.uid
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.messages !== this.props.messages || prevProps.uid !== this.props.uid) {
      this.setState({messages: this.props.messages, uid: this.props.uid});
    }
  }

  renderMessages() {
    let i = 0;
    let messageCount = this.state.messages.length;
    let messages = [];

    while (i < messageCount) {
      let previous = this.state.messages[i - 1];
      let current = this.state.messages[i];
      let next = this.state.messages[i + 1];
      let isMine = current.author === this.state.uid;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as('seconds') < 5) {
          startsSequence = false;
        }

        if (previousDuration.as('seconds') < 5) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('seconds') < 5) {
          endsSequence = false;
        }
      }

      messages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
          idMessage={i}
          onClickItem={this.props.onClickMessage}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return messages;
  }



  render() {
    return(
      <div className="message-list">
        <div className="message-list-container">
          {this.renderMessages()}
        </div>
        <Compose
          onSend={this.props.onSendMessage}
          input={this.props.input}
          handleChange={this.props.onChangeMessage}
        />
      </div>
    );
  }
}
