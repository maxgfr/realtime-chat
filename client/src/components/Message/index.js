import React, { Component } from 'react';
import moment from 'moment';
import './Message.css';

export default class Message extends Component {
  render() {
    const {
      data,
      isMine,
      startsSequence,
      endsSequence,
      showTimestamp,
      idMessage
    } = this.props;

    const friendlyTimestamp = moment(data.timestamp).format('LLLL');
    return (
      <div className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}>
        {
          showTimestamp &&
            <div className="timestamp">
              { friendlyTimestamp }
            </div>
        }
        <p className="author">{data.author}</p>
        <div className="bubble-container">
          <div className="bubble" title={friendlyTimestamp} onClick={() => { this.props.onClickItem(idMessage) }}>
            { data.message }
          </div>
        </div>
      </div>
    );
  }
}
