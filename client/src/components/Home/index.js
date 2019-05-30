import React from "react";
import { withStyles } from '@material-ui/core/styles';


class Home extends React.Component {

  state = {
    username: ''
  }

  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    this.props.history.push('/chatroom');
  }

  render() {
    return (
        <div className={this.props.classes.root}>

        </div>
    );
  }

}

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default withStyles(styles)(Home);
