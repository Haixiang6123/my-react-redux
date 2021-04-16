import React from "react";
import connect from "./lib/components/connect";

const FirstSon = (props) => {
  const {value, add, minus} = props

  return (
    <div>
      大儿子, value: {value}
      <button onClick={add}>add</button>
      <button onClick={minus}>minus</button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  value: state.value
})

const mapDispatchToProps = (dispatch) => ({
  add: () => dispatch({type: 'increment', payload: 1}),
  minus: () => dispatch({type: 'decrement', payload: 1})
})

export default connect(mapStateToProps, mapDispatchToProps)(FirstSon)
