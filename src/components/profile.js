import React from 'react';
import KvetchContext from "../contexts/kvetch-context";
import firebase from '../config/fbconfig';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userentry: '',
            kvetch: '',
            error: false,
            userName: ''
        };
    }

    componentDidMount() {
        const user = firebase.auth().currentUser;
        const profileInfo = user.getBasicProfile();
        let userName = profileInfo.getName();
        let userAvatar = profileInfo.getImageURL();
        this.setState({ user: userName });
    }


    handleChange(event) {
        const username = event.target.value;
        this.setState({ userentry: username });
    }

    handleSubmit() {
        const { userentry } = this.state;
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: userentry,
        }).then((userentry) => {
            this.setState({ user: userentry, userentry: ''});
        })
    }

    render() {
        const { userentry } = this.state;
        return (
            <KvetchContext.Consumer>
                {( {addKvetch, kvetches, loading, user} ) => (
                    <div className="profile">
                        <h1>{this.state.userName}</h1>
                        User Handle
                        <input 
                            className="profile-entry"
                            type="text"
                            maxLength="30"
                            placeholder="Enter new user handle"
                            onChange={event => this.handleChange(event)}
                            value={userentry}
                        />
                        <button
                            className="profile-button"
                            disabled={this.state.error || loading}
                            onClick={() => this.handleSubmit()}
                        >
                           Change User Handle
                        </button>
                    </div>
                )}
            </KvetchContext.Consumer>
        );
    }
}

export default Profile;