import React, { Component } from 'react';

export default class SampleBook extends Component {
  state = {
    viewer: ''
  };

  // handleGoogleScript = () => {
  //   const script = document.createElement('script');
  //   script.src = 'https://www.google.com/books/jsapi.js';
  //   script.async = true;
  //   document.body.appendChild(script);
  // };

  // initialize = () => {
  //   const viewer = new google.books.DefaultViewer();
  //   viewer.load(this.props.isbn);
  //   this.setState({ viewer });
  // };

  // componentDidMount = () => {
  //   this.handleGoogleScript();
  //   google.books.load();
  //   google.books.setOnLoadCallback(this.initialize);
  // };

  render() {
    const { viewer } = this.state;
    return <div>{viewer}</div>;
  }
}
