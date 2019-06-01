import React, { Component } from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';


import './ConversationList.css';

export default class ConversationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: props.conversations,
      conversationsSorted: props.conversations
    };
  }

  _onChangeText = (evt) => {
    console.log(evt.target.value);
    var resultTab = [];
    for(var i = 0; i<this.state.conversations.length; i++) {
      if(this.state.conversations[i].name.search(evt.target.value) !== -1) {
        resultTab.push(this.state.conversations[i]);
      }
    }
    this.setState({conversationsSorted: resultTab})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.conversations !== this.props.conversations) {
      this.setState({conversations: this.props.conversations, conversationsSorted: this.props.conversations});
    }
  }

  render() {
    return (
      <div className="conversation-list">
        <ConversationSearch
          handleChange={this._onChangeText}
        />
        {
          this.state.conversationsSorted.map(conversation =>
            <ConversationListItem
              key={conversation.name}
              data={conversation}
            />
          )
        }
      </div>
    );
  }
}
