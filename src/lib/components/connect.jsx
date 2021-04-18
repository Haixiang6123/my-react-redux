import React from 'react'
import {useContext, useEffect, useState, useMemo} from 'react'
import shallowEquals from '../utils/shallowEquals'
import Context from './Context'

const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  const Connect = (props) => {
    const contextValue = useContext(Context)

    const [counter, updateCounter] = useState(1)

    // 获取当前的 store，并获取 mapStateToProps，看情况传给下一个组件
    const curtStoreState = useMemo(() => {
      return mapStateToProps ? mapStateToProps(contextValue.store.getState()) : {}
    }, [])
    // 获取 mapDispatchToProps 的对象，都传给下一个组件
    const curtDispatchers = useMemo(() => {
      return mapDispatchToProps ? mapDispatchToProps(contextValue.store.dispatch) : {}
    }, [])

    useEffect(() => {
      return contextValue.store.subscribe(() => {
        // 获取最新的 state
        const newStoreState = mapStateToProps ? mapStateToProps(contextValue.store.getState()) : {}
        // 只要 dispatch 且有新 state，就 setXXX
        if (!shallowEquals(curtStoreState, newStoreState)) {
          console.log('update')
          updateCounter(counter + 1)
        }
      })
    }, [contextValue.store, counter])

    return <WrappedComponent {...curtStoreState} {...curtDispatchers} {...props} />
  }

  return Connect
}

export default connect
