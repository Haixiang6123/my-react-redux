import React, {useEffect} from 'react'
import Context from './Context'

const Provider = ({store, children}) => {
  const contextValue = {store}

  useEffect(() => {
    store.subscribe()
  }, [store])

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

export default Provider
