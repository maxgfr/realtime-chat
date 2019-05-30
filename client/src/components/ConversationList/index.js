import React, { Component } from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import axios from 'axios';

import './ConversationList.css';

export default class ConversationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      conversationsSorted: []
    };
  }

  componentDidMount() {
    this.getConversations();
  }

  getConversations = () => {
    axios.get('https://randomuser.me/api/?results=20').then(response => {
      this.setState(prevState => {
        let conversations = response.data.results.map(result => {
          return {
            photo: result.picture.large,
            name: `${result.name.first} ${result.name.last}`,
            text: 'Hello world! This is a long message that needs to be truncated.'
          };
        });

        let conversationsSorted = conversations;

        return { ...prevState, conversationsSorted, conversations };
      });
    });
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
