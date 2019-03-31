import React, { Component } from 'react';

export default class ReadToday extends Component {
  state = {
    pagesToday: 0
  };

  handlePagesChange = event => {
    const pages = event.target.value;
    this.setState({
      pagesToday: pages
    });
  };

  handlePagesSubmit = event => {
    event.preventDefault();
  };

  render() {
    const { pages } = this.state;
    return (
      <div className='pages-read-container'>
        <div className='input-field pages-input'>
          <input
            type='number'
            name='pages'
            onChange={this.handlePagesChange}
            value={pages}
          />
          <p>pages</p>
        </div>
        <button
          className='my-button confirm-pages'
          onClick={this.handlePagesSubmit}
        >
          Confirm
        </button>
      </div>
    );
  }
}
