import React from "react";
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Chatroom.css';

export default class Chatroom extends React.Component {

  render() {
    return (
      <div className="messenger">

        <div className="scrollable sidebar">
          <ConversationList />
        </div>

        <div className="scrollable content">
          <MessageList />
        </div>
      </div>
    )
  }

}
