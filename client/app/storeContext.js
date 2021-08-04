import React from 'react'
import observationsStore from '_store/observations'

const StoreContext = React.createContext({observationsStore});
const StoreContextProvider = ({children})=><StoreContext.Provider value={{observationsStore}}>{children}</StoreContext.Provider>

export {StoreContextProvider}
export default StoreContext