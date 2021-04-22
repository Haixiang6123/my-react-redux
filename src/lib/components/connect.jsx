import React, {memo, useContext, useLayoutEffect, useMemo, useReducer, useRef} from 'react'
import Context from './Context'
import {impureFinalPropsSelectorFactory} from "../utils/selectorFactory";
import {defaultMergeProps} from "../utils/mergeProps";

// 空函数
const emptyFn = () => ({})

// 监听 props 变化来更新
function subscribeUpdates(
  store,
  childPropsSelector,
  lastWrapperProps,
  lastChildProps,
  renderIsScheduled,
  childPropsFromStoreUpdate,
  forceComponentUpdateDispatch
) {
  const checkForUpdates = () => {
    // 最新的 store state
    const latestStoreState = store.getState()

    // 使用最新的 store state 和上一次的 wrapper props 计算最新的 child props
    const newChildProps = childPropsSelector(latestStoreState, lastWrapperProps.current)

    // 判断新的和旧的 child props 是否相等
    if (newChildProps === lastChildProps.current) {
      if (renderIsScheduled.current) {
        // notifyNestedSub
      }
    } else {
      // 更新 ref 的值
      lastChildProps.current = newChildProps
      childPropsFromStoreUpdate.current = newChildProps
      renderIsScheduled.current = true

      // 更新渲染
      forceComponentUpdateDispatch({type: 'STORE_UPDATED'})
    }
  }

  const unsubscribe = store.subscribe(checkForUpdates)

  checkForUpdates()

  return unsubscribe
}


// 每次渲染时，需要重新更新 ref 的值，用于下一次比较
function captureWrapperProps(
  lastWrapperProps,
  lastChildProps,
  wrapperProps,
  actualChildProps,
  renderIsScheduled,
  childPropsFromStoreUpdate,
  notifyNestedSubs,
) {
  // 监听 wrapper props 来更新 ref
  lastWrapperProps.current = wrapperProps
  lastChildProps.current = actualChildProps
  renderIsScheduled.current = true

  // 如果由于 store 更新导致的渲染，那么清除该值，触发当前所有的 subscriber
  if (childPropsFromStoreUpdate.current) {
    childPropsFromStoreUpdate.current = null
    // notifyNestedSubs()
  }
}

// reducer
function storeStateUpdateReducer(state) {
  return state + 1
}

const connect = (mapStateToProps = emptyFn, mapDispatchToProps = emptyFn) => (WrappedComponent) => {
  const Connect = (props) => {
    const contextValue = useContext(Context)

    const [count, forceComponentUpdateDispatch] = useReducer(storeStateUpdateReducer, 0)

    // 外层传入的 props
    const wrapperProps = props;

    // store
    const store = Boolean(props.store) ? props.store : contextValue.store

    // 重要函数: childPropsSelector
    const childPropsSelector = useMemo(() => {
      return impureFinalPropsSelectorFactory(
        mapStateToProps,
        mapDispatchToProps,
        defaultMergeProps,
        store.dispatch
      )
    }, [store])

    // 是否需要渲染的变量
    const lastChildProps = useRef()
    const lastWrapperProps = useRef()
    const childPropsFromStoreUpdate = useRef()
    const renderIsScheduled = useRef(false)

    // childProps 由以下的决定
    // 1. store 里的 state 发生变化而改变
    // 2. 外部传入 wrappedProps 改变而改变
    const actualChildProps = useMemo(() => {
      // 如果 childProps 从 store 里改变，且 wrapperProps 没变，那直接返回由于 store 改变的 childProps
      if (childPropsFromStoreUpdate.current && wrapperProps === lastWrapperProps.current) {
        return childPropsFromStoreUpdate.current
      }

      return childPropsSelector(store.getState(), wrapperProps)
    }, [childPropsSelector, store, wrapperProps])

    useLayoutEffect(() => subscribeUpdates(
      store,
      childPropsSelector,
      lastWrapperProps,
      lastChildProps,
      renderIsScheduled,
      childPropsFromStoreUpdate,
      forceComponentUpdateDispatch
    ), [childPropsSelector, store])

    return <WrappedComponent {...actualChildProps} />
  }

  return memo(Connect)
}

export default connect
