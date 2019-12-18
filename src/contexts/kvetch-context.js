import React from 'react';

const KvetchContext = React.createContext({
    user: "",
    kvetches: [],
    addKvetch: (kvetch) => { },
    loadingPost: false,
    loadingGet: false,
    postError: false,
});

export default KvetchContext;