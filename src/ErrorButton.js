import React from 'react';

class ErrorButton extends React.Component {
  state = { showError: false };

  handleClick = () => {
    this.setState({ showError: true });
  };

  render() {
    if (this.state.showError) {
      throw new Error('Oops!');
    }

    return <button onClick={this.handleClick}>Trigger Error</button>;
  }
}

export default ErrorButton;
