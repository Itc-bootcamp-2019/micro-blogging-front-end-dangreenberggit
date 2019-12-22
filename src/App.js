import React from 'react';
import './App.css';
import KvetchBox from './components/kvetching/index';
import KvetchContext from "./contexts/kvetch-context";
import KvetchDisplay from './components/kvetching/kvetchdisplay';
import Profile from './components/profile';
import Navbar from './components/navbar/navbar';
import Loader from './components/loader';
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
      postError: false,
    };
    this.getAllTweets = this.getAllTweets.bind(this);
  }

  handleOnSubmit(kvetch) {
    this.sendKvetch(kvetch);
  }

  updateUser() {
    const username = ls.get('username') || '';
    this.setState({ user: username });
  }

  componentDidMount() {
    this.setState({ loadingGet: true });
    this.getAllTweets();
    this.updateUser();
  }

  componentDidUpdate() {
    setTimeout(this.getAllTweets, 2000);
  }

  getAllTweets() {
    let tweetStorage = [];
    db.collection('Messages').get() 
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        tweetStorage.push(doc);
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
    let tweetArray = tweetStorage.reverse();
    while (tweetArray.length > 10) {
      tweetArray.pop();
    }
    this.setState({ kvetches: tweetArray });
  }

/*     getTweets().then(response => {
      let latestTweets = response.data.tweets;
      this.setState({ kvetches: latestTweets, loadingGet: false, });
    }); */
  }

  sendKvetch(kvetch) {
    this.setState({ loadingPost: true });
    let date = new Date();
    let timestamp = date.toISOString();
    const tweetInfo = {
      userName: user,
      content: kvetch,
      date: timestamp,
    }

    let addDoc = db.collection('Messages').add({
      tweet: tweetInfo
    }).then(ref => {
      console.log('Added document with ID: ', ref.id);
    });
  /*   if (user && kvetch) {
      sendTweet(tweetInfo).then(response => {
        this.setState({ loadingPost: false, postError: false });
      })
      .catch(response => {
        this.setState({ postError: true });
      }); */
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