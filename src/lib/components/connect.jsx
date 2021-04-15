import {useContext, useEffect, useState} from 'react/cjs/react.production.min'
import shallowEquals from '../utils/shallowEquals'
import Context from './Context'

const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  const Connect = (props) => {
    const [, update] = useState({})

    const contextValue = useContext(Context)

    const newStoreState = mapStateToProps ? mapStateToProps(contextValue.store.getState()) : {}
    const newDispatchProps = mapDispatchToProps ? mapDispatchToProps(contextValue.store.dispatch) : {}

    useEffect(() => {
      return contextValue.store.subscribe(() => {
        const newState = mapStateToProps ? mapStateToProps(contextValue.store.getState()) : {}
        if (shallowEquals(newState, newState)) {
          console.log('update')
          update({})
        }
      })
    }, [contextValue.store])

    return <WrappedComponent {...newStoreState} {...newDispatchProps} {...props}/>
  }

  return Connect
}
