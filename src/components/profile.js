import React from 'react';
import KvetchContext from "../contexts/kvetch-context";
import ls from 'local-storage';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userentry: '',
            kvetch: '',
            error: false,
            user: ''
        };
    }

    componentDidMount() {
        let username = ls.get('username') || '';
        console.log(username);
        this.setState({ user: username });
    }


    handleChange(event) {
        const username = event.target.value;
        this.setState({ userentry: username });
    }

    handleSubmit() {
        const {userentry} = this.state;
        ls.set ('username', userentry);
        this.setState({ user: userentry, userentry: ''});  
    }

    render() {
        const { userentry } = this.state;
        return (
            <KvetchContext.Consumer>
                {( {addKvetch, kvetches, loading, user} ) => (
                    <div className="profile">
                        <h1>{this.state.user}</h1>
                        User Name
                        <input 
                            className="profile-entry"
                            type="text"
                            maxLength="30"
                            placeholder="Enter user name"
                            onChange={event => this.handleChange(event)}
                            value={userentry}
                        />
                        <button
                            className="profile-button"
                            disabled={this.state.error || loading}
                            onClick={() => this.handleSubmit()}
                        >
                            Log In
                        </button>
                    </div>
                )}
            </KvetchContext.Consumer>
        );
    }
}

export default Profile;