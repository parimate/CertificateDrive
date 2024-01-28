import { createContext, useState } from 'react';
export const AppContext = createContext(null);

export const Provider = ({ children }) => {
    const [data, setData] = useState( [])
    const [sharedData, setSharedData] = useState( []);

    const handleSetData = (payload) => {
        setData(payload)
    }

    const handleSetShareData = payload => {
        setSharedData(payload)
    }

    return <AppContext.Provider value={{ data, setData: handleSetData, sharedData, setSharedData: handleSetShareData }}>
        {children}
    </AppContext.Provider>
}

