import React from 'react';
import './App.css';
import KvetchBox from './components/kvetching/index';
import KvetchContext from "./contexts/kvetch-context";
import KvetchDisplay from './components/kvetching/kvetchdisplay';
import Profile from './components/profile';
import Navbar from './components/navbar/navbar';
import Loader from './components/loader';
import ls from 'local-storage';
import firebase from './config/fbconfig';

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
    //setTimeout(this.getAllTweets, 2000);
  }

  getAllTweets() {
    const db = firebase.firestore();
    db.collection('Messages').get() 
    .then((snapshot) => {
      const tweetStorage = [];
      snapshot.forEach((doc) => {
        const tweet  = doc.data();
        const newTweet = { 
          userName: tweet.userName,
          date: tweet.date,
          content: tweet.content,
          id: tweet.id,
        }
        tweetStorage.push(newTweet);
      });
      const tweetArray = tweetStorage.reverse();
      while (tweetArray.length > 10) {
        tweetArray.pop();
      };
      this.setState({ kvetches: tweetArray, loadingGet: false });
    })
    .catch((err) => {
      console.log('Error loading tweet', err);
    });
  }

  sendKvetch(kvetch) {
    this.setState({ loadingPost: true });
    let date = new Date();
    let { user } = this.state;
    let timestamp = date.toISOString();
    const tweetInfo = {
      userName: user,
      content: kvetch,
      date: timestamp,
    }
    const { kvetches } = this.state;
    kvetches.push(tweetInfo);
    this.setState({ kvetches: kvetches });
    const db = firebase.firestore();
    db.collection('Messages').add({
      ...tweetInfo
    }).then(function(docRef) {
      db.collection('Messages').doc(docRef.id).update({
        id: docRef.id
      })
    });
  }
  /*   if (user && kvetch) {
      sendTweet(tweetInfo).then(response => {
        this.setState({ loadingPost: false, postError: false });
      })
      .catch(response => {
        this.setState({ postError: true });
      }); 
      }
      */


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