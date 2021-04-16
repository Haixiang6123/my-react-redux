import React from "react";
import connect from "./lib/components/connect";
import SecondSon from "./SecondSon";

const SecondFather = (props) => {
  const {add, minus} = props

  return (
    <div className="father">
      <h2>二爸爸</h2>

      <div>
        <button onClick={add}>store.value + 2</button>
        <button onClick={minus}>store.value - 2</button>
      </div>

      <SecondSon/>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  add: () => dispatch({type: 'increment', payload: 2}),
  minus: () => dispatch({type: 'decrement', payload: 2})
})

export default connect(null, mapDispatchToProps)(SecondFather)
