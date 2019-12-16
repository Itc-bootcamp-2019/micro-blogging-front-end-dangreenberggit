import React from 'react';
import './App.css';
import KvetchBox from './components/kvetchbox';
import KvetchContext from "./contexts/kvetch-context";
import KvetchDisplay from './components/kvetchdisplay';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kvetches: [],
      addKvetch: this.handleOnSubmit.bind(this)
    };
  }

  handleOnSubmit(kvetch) {
    const { kvetches } = this.state;
    this.setState({ kvetches: [kvetch, ...kvetches] });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <KvetchContext.Provider value={this.state}>
            <KvetchBox
            />
            <KvetchDisplay
            />
          </KvetchContext.Provider>
        </header>
      </div>
    );
  }
}

export default App;