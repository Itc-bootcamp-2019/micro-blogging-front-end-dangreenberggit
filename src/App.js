import React from 'react';
import './App.css';
import { sendTweet, getTweets } from "./lib/api";
import KvetchBox from './components/kvetchbox';
import KvetchContext from "./contexts/kvetch-context";
import KvetchDisplay from './components/kvetchdisplay';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "Master Yoda",
      kvetches: [],
      addKvetch: this.handleOnSubmit.bind(this),
      loading: false,
    };
  }

  handleOnSubmit(kvetch) {
    this.sendKvetch(kvetch);
  }

  componentDidMount() {
    this.getAllTweets();
    this.setState({loading: true});
}

  getAllTweets() {
      getTweets().then(response => {
        let latestTweets = response.data.tweets;
        while (latestTweets.length > 5  ) {
          latestTweets.pop();
        }
        this.setState({ kvetches: latestTweets, loading: false, });
      });
  }

  async sendKvetch(kvetch) {
    this.setState({ loading: true });
    const { user } = this.state;
    let date = new Date();
    let timestamp = date.toISOString();
    const tweetInfo = {
      userName: user,
      content: kvetch,
      date: timestamp,
    }
    if (user && kvetch) {
      const response = await sendTweet(tweetInfo);
      if (response.success) {
        this.getAllTweets();
      }
    }
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