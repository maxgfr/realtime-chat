import React, { Component } from 'react';
import SendIcon from '@material-ui/icons/Send';
import './Compose.css';

export default class Compose extends Component {

  render() {
    return (
      <div className="compose">
        <input
          onChange={this.props.handleChange}
          value={this.props.input}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              console.log(e);
              e.target.value = this.props.input;
              this.props.handleChange(e);
            }
          }}
          type="text"
          className="compose-input"
          placeholder="Type a message..."
        />
        <button className="compose-send" onClick={this.props.onSend}><SendIcon style={{fontSize:14}}/></button>
      </div>
    );
  }
}
