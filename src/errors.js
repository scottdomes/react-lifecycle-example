import React, { Component } from 'react';

export class ErrorButton extends Component {
  state = { showError: false };

  handleClick = () => {
    this.setState({ showError: true });
  };

  render() {
    if (this.state.showError) {
      throw new Error('Something went wrong.');
    }

    return <button onClick={this.handleClick}>Trigger Error</button>;
  }
}

export class ErrorBoundary extends Component {
  state = { errorMessage: null };

  static getDerivedStateFromError(error) {
    return { errorMessage: error.message };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.errorMessage) {
      return <h1>Oops! {this.state.errorMessage}</h1>;
    }

    return this.props.children;
  }
}
