import React from 'react';

const KvetchContext = React.createContext({
    user: "",
    kvetches: [],
    addKvetch: (kvetch) => { },
});

export default KvetchContext;