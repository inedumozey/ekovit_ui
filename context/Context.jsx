import React, { createContext } from 'react'
import staticDataClass from './data/staticDataClass'
const staticData = new staticDataClass()

export const ContextData = createContext()


export default function Context({ children }) {
    const data = {
        ...staticData
    }

    return (
        <ContextData.Provider value={data}>{children}</ContextData.Provider>
    )
}
