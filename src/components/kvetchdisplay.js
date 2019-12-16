import React from 'react';
import KvetchContext from "../contexts/kvetch-context";
import './kvetch-style.css';

const KvetchDisplay = props => {
  return (
    <KvetchContext.Consumer>
      {({ addKvetch, kvetches }) => (
        <div className="display-container">
          {kvetches.map(kvetch => (
            <div className="display-item" key={kvetch}>{kvetch}</div>
          ))}
        </div>
      )}
    </KvetchContext.Consumer>
  );
};

export default KvetchDisplay;