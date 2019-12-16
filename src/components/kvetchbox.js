import React from 'react';
import KvetchContext from "../contexts/kvetch-context";
import './kvetch-style.css';

class Kvetchbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        kvetch: ''
    };
  }

  handleKvetch(event) {
    this.setState({ kvetch: event.target.value });
  }

  render() {
    const { kvetch } = this.state;
    return (
      <KvetchContext.Consumer>
        {( {addKvetch, kvetches} ) => (
            <div className="kvetch-container">
                <textarea className="kvetch-entry"
                type="text"
                onChange={event => this.handleKvetch(event)}
                value={this.state.kvetch}
                />
                <button className="submit-button" onClick={() => {addKvetch(kvetch); this.setState( { kvetch: ''})}}>Kvetch!</button>
            </div>
        )}
      </KvetchContext.Consumer>
    );
  }
}

export default Kvetchbox;