import React, { Component } from 'react';
import { connect } from 'react-redux';

import { doInitialiseTronWeb } from '../actions';
// import './App.css';

class App extends Component {
  componentDidMount() {
    // Initialise TronWeb
    const { doInitialiseTronWeb } = this.props;
    doInitialiseTronWeb();
  }

  render() {
    return (
      <div>
        <header>
          <h2>Tron CRUD Demo</h2>
        </header>
        <section>
          <h3>Build Main section here !</h3>
        </section>
      </div>
    );
  }
}

export default connect(null, { doInitialiseTronWeb })(App);
