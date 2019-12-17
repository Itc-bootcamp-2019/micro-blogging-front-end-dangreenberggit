import React from 'react';
import KvetchContext from "../contexts/kvetch-context";
import './kvetch-style.css';

class KvetchDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            kvetch: '',
            kvetches: [],
            error: false,
            loading: false,
        };
    }

    render() {
        return(      
            <KvetchContext.Consumer>
            {({ user, addKvetch, kvetches }) => (
                <div className="kvetch display-container">
                {kvetches.map(kvetch => (
                    <div className="kvetch display-item" key={kvetch.date}>
                        <div className="kvetch-info-container">
                            <div className="kvetch-info user">
                                {kvetch.userName}
                            </div>
                            <div className="kvetch-info date">
                                {kvetch.date}
                            </div>
                        </div>
                        <div>
                            {kvetch.content}
                        </div>
                    </div>
                ))}
                </div>
            )}
            </KvetchContext.Consumer>
        )
    }
};

export default KvetchDisplay;