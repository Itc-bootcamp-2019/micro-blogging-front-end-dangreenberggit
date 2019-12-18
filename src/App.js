import React from 'react';
import './App.css';
import { sendTweet, getTweets } from "./lib/api";
import KvetchBox from './components/kvetching/index';
import KvetchContext from "./contexts/kvetch-context";
import KvetchDisplay from './components/kvetching/kvetchdisplay';
import Profile from './components/profile';
import Navbar from './components/navbar/navbar';
import Loader from './components/loader';
import ls from 'local-storage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "guest",
      kvetches: [],
      addKvetch: this.handleOnSubmit.bind(this),
      loadingPost: false,
      loadingGet: false,
    };
  }

  handleOnSubmit(kvetch) {
    this.sendKvetch(kvetch);
  }

  updateUser() {
    const username = ls.get('username') || '';
    this.setState({ user: username });
  }

  componentDidMount() {
    this.setState({ loadingGet: true, });
    this.getAllTweets();
    this.updateUser();
}

  getAllTweets() {
      getTweets().then(response => {
        let latestTweets = response.data.tweets;
        this.setState({ kvetches: latestTweets, loadingGet: false, });
      });
  }

  sendKvetch(kvetch) {
    this.setState({ loadingPost: true });
    const user = ls.get('username') || '';
    let date = new Date();
    let timestamp = date.toISOString();
    const tweetInfo = {
      userName: user,
      content: kvetch,
      date: timestamp,
    }
    if (user && kvetch) {
      sendTweet(tweetInfo).then(response => {
        this.getAllTweets();
        this.setState({ loadingPost: false });
      })
      .catch(response => {
        alert("Posting error!");
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Router>
            <Navbar />

            <div className="App-content">
              <Switch>
                <Route path="/profile">
                  <Profile />
                </Route>
                <Route exact path="/">
                    <KvetchContext.Provider value={this.state}>
                      <KvetchBox/>
                        {this.state.loadingGet && <Loader />}
                        {!this.state.loadingGet && <KvetchDisplay />}
                    </KvetchContext.Provider>
                </Route>
              </Switch>
              </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;