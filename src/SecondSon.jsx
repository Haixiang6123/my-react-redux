import React from "react";
import connect from "./lib/components/connect";

const SecondSon = (props) => {
  const {add, minus} = props

  return (
    <div>
      二儿子
      <button onClick={add}>+2</button>
      <button onClick={minus}>-2</button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  add: () => dispatch({type: 'increment', payload: 2}),
  minus: () => dispatch({type: 'decrement', payload: 2})
})

export default connect(null, mapDispatchToProps)(SecondSon)
