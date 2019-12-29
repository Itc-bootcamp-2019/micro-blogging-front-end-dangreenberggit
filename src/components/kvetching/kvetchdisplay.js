import React from 'react';
import KvetchContext from "../../contexts/kvetch-context";
import './kvetch-style.css';

class KvetchDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            kvetch: '',
            kvetches: [],
            error: false,
        };
    }

    render() {
        return(      
            <KvetchContext.Consumer>
            {({ addKvetch, kvetches }) => (
                <div className="kvetch display-container">
                {kvetches.map(kvetch => (
                    <div className="kvetch display-item" key={kvetch.messageId}>
                        <div className="kvetch-info-container">
                            <img
                                className="kvetch-info avatar"
                                src={"url(" + kvetch.avatar + ")"}
                            />
                            <div className="kvetch-info user">
                                {kvetch.name}
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