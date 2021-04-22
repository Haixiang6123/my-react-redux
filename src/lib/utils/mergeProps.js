export function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  console.log('1', stateProps)
  return {...ownProps, ...stateProps, ...dispatchProps}
}
