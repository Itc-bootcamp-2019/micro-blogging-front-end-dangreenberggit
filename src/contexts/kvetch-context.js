import React from 'react';

const KvetchContext = React.createContext({
    kvetches: [],
    addKvetch: (kvetch) => { }
});

export default KvetchContext;