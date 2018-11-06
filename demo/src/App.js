import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  WithoutFirehookComponent,
  FirehookDocComponent,
  FirehookQueryComponent
} from './components';

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <button onClick={() => this.setState({ visible: 1 })}>
          Pure Hooks
        </button>
        <button onClick={() => this.setState({ visible: 2 })}>
          Firehook Doc
        </button>
        <button onClick={() => this.setState({ visible: 3 })}>
          Firehook Query
        </button>

        {this.state.visible === 1 && <WithoutFirehookComponent />}
        {this.state.visible === 2 && <FirehookDocComponent />}
        {this.state.visible === 3 && <FirehookQueryComponent />}
      </div>
    );
  }
}

export default App;
