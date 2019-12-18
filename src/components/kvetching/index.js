import React from 'react';
import KvetchContext from "../../contexts/kvetch-context";
import './kvetch-style.css';

class Kvetchbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            kvetch: '',
            error: false,
            postError: true,
        };
    }


    handleKvetch(event) {
        const kvetch = event.target.value;
        this.setState({ kvetch: kvetch });
        if ((kvetch.length > 140) || (kvetch.length < 0)) {
            this.setState({ error: true });
        } else {
            this.setState({ error: false });
        }
    }

    render() {
        const { user, kvetch, error } = this.state;
        return (
            <KvetchContext.Consumer>
                {( {addKvetch, kvetches, loading, postError} ) => (
                    <div className="kvetch kvetch-container">
                        {!postError &&
                        <textarea
                            className="kvetch kvetch-entry"
                            type="text"
                            maxLength="350"
                            placeholder="What, I need to beg you to kvetch about something?"
                            onChange={event => this.handleKvetch(event)}
                            value={kvetch}
                        />
                        }

                        {postError &&
                        <textarea
                            className="kvetch kvetch-entry post-error"
                            type="text"
                            maxLength="350"
                            placeholder="Error posting!"
                            onChange={event => this.handleKvetch(event)}
                            value={kvetch}
                        />
                        }

                        {error &&
                            <div className="kvetch error">
                                Oy! You can't Kvetch for more than 140 chars!
                            </div>
                        }
                        <button
                            className="kvetch submit-button"
                            disabled={this.state.error || loading}
                            onClick={() => {addKvetch(kvetch); this.setState( { kvetch: ''})}}
                        >
                            Kvetch!
                        </button>
                    </div>
                )}
            </KvetchContext.Consumer>
        );
    }
}

export default Kvetchbox;