import React from 'react';
import './App.css';
import KvetchBox from './components/kvetching/index';
import KvetchContext from "./contexts/kvetch-context";
import KvetchDisplay from './components/kvetching/kvetchdisplay';
import Profile from './components/profile';
import Navbar from './components/navbar/navbar';
import Loader from './components/loader';
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
      user: 'guest',
      kvetches: [],
      addKvetch: this.handleOnSubmit.bind(this),
      loadingPost: false,
      loadingGet: false,
      postError: false,
      isSignedIn: false,
    };
    this.getAllTweets = this.getAllTweets.bind(this);
    this.sendKvetch = this.sendKvetch.bind(this);
  }

  handleOnSubmit(kvetch) {
    this.sendKvetch(kvetch);
  }

  updateUser() {
    const user = firebase.auth().currentUser;
    const id_token = user.getAuthResponse().id_token;
    const profile = user.getBasicProfile();
    const userInfo = {
      id: id_token,
      name: profile.getName(),
      avatar: profile.getImageURL(),
    //  email: profile.getEmail(),
    }
    const usersDb = firebase.firestore().collection('Users');
    usersDb.doc(id_token).add({
      ...userInfo
    }).then(() => {
      this.setState({ user: id_token });
    });
  }

  userCheck() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.updateUser()
      } else {
        this.setState({ user: null });
      }
    });
  }


  componentDidMount() {
    this.setState({ loadingGet: true });
    this.getAllTweets();
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({isSignedIn: !!user})
    );
    this.userCheck();
  }

  componentDidUpdate() {
    setTimeout(this.getAllTweets, 2000);
  }

  getAllTweets() {
    const messageDb = firebase.firestore().collection('Messages');
    messageDb.get() 
    .then((snapshot) => {
      const tweetStorage = [];
      snapshot.forEach((doc) => {
        const tweet  = doc.data();
        const newTweet = { 
          googleId: tweet.id,
          date: tweet.date,
          content: tweet.content,
          messageId: tweet.id,
        }
        const { user } = this.state;
        const userDb = firebase.firestore().collection('Users').doc(user);
        userDb.get() 
        .then((user) => {
          newTweet.name = user.name;
          newTweet.avatar = user.avatar;
          tweetStorage.push(newTweet);
        })
      });
      const tweetArray = tweetStorage.reverse();
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
      googleId: user,
      content: kvetch,
      date: timestamp
    }
    let { kvetches } = this.state;
    kvetches = [tweetInfo, ...kvetches];
    this.setState({ kvetches: kvetches });
    const messageDb = firebase.firestore().collection('Messages');
    messageDb.add({
      ...tweetInfo
    }).then((docRef) => {
      messageDb.doc(docRef.id).update({
        messageId: docRef.id
      })
      this.setState({ loadingPost: false });
    });
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Router>
            <Navbar loggedIn={this.state.isSignedIn} />

            <div className="App-content">
              <Switch>
                {/* <Route path="/profile">
                  {this.state.isSignedIn && <Profile />}
                </Route> */}
                <Route exact path="/">
                    <KvetchContext.Provider value={this.state}>
                      {this.state.isSignedIn && <KvetchBox/>}
                      {!(this.state.isSignedIn || this.state.loadingGet) && <Loader />}
                      {(this.state.isSignedIn && !this.state.loadingGet) && <KvetchDisplay />}
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