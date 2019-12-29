import React from 'react';
import KvetchContext from "../../contexts/kvetch-context";
import { getQueriesForElement } from '@testing-library/react';

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            avatar: '',
        };

    componentDidMount() {
        this.getUser();
    }
    
    getUser() {
        const user = this.props.googleId;
        const userDb = firebase.firestore().collection('Users').doc(user);
        userDb.get() 
        .then((user) => {
            this.setState({
                id: user.id;
                name: user.name;
                avatar: user.avatar;
            })
        }
    }

    render() {
        const { name, avatar } = this.state;
        const { id, date, content } = props;
        return(
            <div className="kvetch display-item" key={id}>
                <div className="kvetch-info-container">
                    <div className="kvetch-info user">
                        {name}
                    </div>
                    <div className="kvetch-info date">
                        {date}
                    </div>
                </div>
                <div>
                    {content}
                </div>
            </div>
        )
    }
}